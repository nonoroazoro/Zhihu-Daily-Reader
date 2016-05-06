/**
 * 负责爬取知乎日报内容。
 */

const _ = require("lodash");
const async = require("async");
const config = require("config").crawler;

const daily = require("../daily");
const story = require("../story");
const catalog = require("../catalog");
const resource = require("../resource");

/**
 * 离线指定的日报。
 * @param {String} p_id ID。
 * @param {String} p_date 日期。
 * @param {Function(err, doc)} [p_callback]
 */
module.exports.cacheStory = function (p_id, p_date, p_callback)
{
    const self = this;
    async.retry({
        times: config.daily_retry,
        interval: config.daily_interval * 1000
    },
    (done, results) =>
    {
        daily.fetchStory(p_id, done);
    },
    (err, res) =>
    {
        // 不管抓取失败与否，都将 ID 记录下来（完备）。
        if (err)
        {
            story.logUncachedStory(p_id, p_date, () =>
            {
                p_callback(err);
            });
        }
        else
        {
            res.story.date = p_date;
            story.saveStory(res.story, (err, doc) =>
            {
                self.cacheImages(res.images, () =>
                {
                    p_callback(err, doc);
                });
            });
        }
    });
};

/**
 * 离线最新的知乎日报。
 * @param {Function(err, res)} [p_callback]
 */
module.exports.cacheLatestStories = function (p_callback)
{
    async.waterfall(
        [
            daily.fetchLatestStoryIDs,
            _cacheStoryIDsTask,
            _preprocessTask,
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 离线知乎日报。如果未指定 ID 列表，则离线指定日期的知乎日报。
 * @param {String} p_date 日期。
 * @param {Array} [p_ids] ID 列表。
 * @param {Function(err, res)} [p_callback]
 */
module.exports.cacheStories = function (p_date, p_ids, p_callback)
{
    const self = this;
    if (_.isFunction(p_date))
    {
        p_date(new Error("p_date must not be null."));
    }
    else
    {
        const tasks = [_cacheStoriesTask.bind(self)];
        if (_.isFunction(p_ids))
        {
            p_callback = p_ids;
            tasks.unshift(
                daily.fetchStoryIDs.bind(self, p_date),
                _cacheStoryIDsTask,
                _preprocessTask
            );
        }
        else
        {
            const res = { date: p_date, ids: p_ids };
            tasks.unshift(
                _cacheStoryIDsTask.bind(self, res),
                _preprocessTask
            );
        }
        async.waterfall(tasks, p_callback);
    }
};

/**
 * 离线图片资源。
 * @param {String|Array} p_urls 单个或多个图片地址。
 * @param {Function(err, res)} [p_callback]
 */
module.exports.cacheImages = function (p_urls, p_callback)
{
    if (_.isFunction(p_urls))
    {
        p_urls(new Error("p_urls must not be null."));
    }
    else
    {
        if (_.isString(p_urls) && !_.isEmpty(p_urls))
        {
            p_urls = [p_urls];
        }

        if (_.isArray(p_urls))
        {
            const errors = [];
            async.eachSeries(p_urls, (url, done) =>
            {
                daily.fetchImage(url, (err, res) =>
                {
                    if (err)
                    {
                        errors.push(err);
                        done();
                    }
                    else
                    {
                        resource.saveResource(res, () =>
                        {
                            done();
                        });
                    }
                });
            }, () =>
            {
                p_callback(errors.length > 0 ? errors : null);
            });
        }
        else
        {
            p_callback(new Error("p_urls has a wrong format."));
        }
    }
};

/**
 * 离线知乎日报列表（不管是否成功都回调）。
 * @param {Object} p_res 中间结果，包含 ids 和 date。
 * @param {Function(err, res)} [p_callback]
 */
function _cacheStoryIDsTask(p_res, p_callback)
{
    // 注意：只保存非空列表。
    if (_.isEmpty(p_res.ids))
    {
        p_callback(null, p_res);
    }
    else
    {
        catalog.saveCatalog(p_res, () =>
        {
            p_callback(null, p_res);
        });
    }
}

/**
 * 对中间结果进行预处理：移除已离线的日报。
 * @param {Object} p_res 中间结果，包含 ids 和 date。
 * @param {Function(err, res)} [p_callback]
 */
function _preprocessTask(p_res, p_callback)
{
    story.query({
        date: p_res.date,
        cached: true
    }, {
        id: 1,
        _id: 0
    }, (err, docs) =>
    {
        if (!err && docs)
        {
            const cachedIDs = _.map(docs, (value) =>
            {
                return value.id;
            });
            _.remove(p_res.ids, (id) =>
            {
                return _.indexOf(cachedIDs, id) != -1;
            });
        }
        p_callback(null, p_res);
    });
}

/**
 * 离线知乎日报。
 * @param {Object} p_res 中间结果，包含 ids 和 date。
 * @param {Function(err, res)} [p_callback]
 */
function _cacheStoriesTask(p_res, p_callback)
{
    const self = this;
    const result = { date: p_res.date, cached: [] };
    async.eachSeries(
        p_res.ids,
        (id, done) =>
        {
            self.cacheStory(id, p_res.date, (err) =>
            {
                if (!err)
                {
                    result.cached.push(id);
                }
                done();
            });
        },
        () =>
        {
            p_callback(null, result);
        }
    );
}
