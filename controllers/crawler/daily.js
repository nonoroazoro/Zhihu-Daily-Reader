/**
 * 负责爬取知乎日报内容。
 */

var _ = require("lodash");
var async = require("async");
var config = require("config").crawler;

var daily = require("../daily");
var story = require("../story");
var catalog = require("../catalog");
var resource = require("../resource");

/**
 * 离线指定的日报。
 * @param {String} p_id ID。
 * @param {String} p_date 日期。
 * @param {Function(err, doc)} [p_callback]
 */
exports.cacheStory = function (p_id, p_date, p_callback)
{
    var that = this;
    async.retry({
        times: config.daily_retry,
        interval: config.daily_interval * 1000
    },
    function (done, results)
    {
        daily.fetchStory(p_id, done);
    },
    function (err, res)
    {
        // 不管抓取失败与否，都将 ID 记录下来（完备）。
        if (err)
        {
            story.logUncachedStory(p_id, p_date, function ()
            {
                p_callback(err);
            });
        }
        else
        {
            res.story.date = p_date;
            story.saveStory(res.story, function (err, doc)
            {
                that.cacheImages(res.images, function ()
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
exports.cacheLatestStories = function (p_callback)
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
exports.cacheStories = function (p_date, p_ids, p_callback)
{
    if (_.isFunction(p_date))
    {
        p_date(new Error("p_date must not be null."));
    }
    else
    {
        var tasks = [_cacheStoriesTask.bind(this)];
        if (_.isFunction(p_ids))
        {
            p_callback = p_ids;
            tasks.unshift(
                daily.fetchStoryIDs.bind(this, p_date),
                _cacheStoryIDsTask,
                _preprocessTask
            );
        }
        else
        {
            var res = { date: p_date, ids: p_ids };
            tasks.unshift(
                _cacheStoryIDsTask.bind(this, res),
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
exports.cacheImages = function (p_urls, p_callback)
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
            var errors = [];
            async.eachSeries(p_urls, function (url, done)
            {
                daily.fetchImage(url, function (err, res)
                {
                    if (err)
                    {
                        errors.push(err);
                        done();
                    }
                    else
                    {
                        resource.saveResource(res, function ()
                        {
                            done();
                        });
                    }
                });
            }, function ()
            {
                p_callback(errors.length > 0? errors: null);
            });
        }
        else
        {
            p_callback(new Error("p_urls has a wrong format."));
        }
    }
};

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
    }, function (err , docs)
    {
        if (!err && docs)
        {
            var cachedIDs = _.map(docs, function (value)
            {
                return value.id;
            });
            _.remove(p_res.ids, function (id)
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
    var result = { date: p_res.date, cached: [] };
    async.eachSeries(p_res.ids, function (id, done)
    {
        this.cacheStory(id, p_res.date, function (err)
        {
            if (!err)
            {
                result.cached.push(id);
            }
            done();
        });
    }.bind(this), function ()
    {
        p_callback(null, result);
    });
}

/**
 * 离线知乎日报目录（不管是否成功都回调）。
 * @param {Object} p_res 中间结果，包含 ids 和 date。
 * @param {Function(err, res)} [p_callback]
 */
var _cacheStoryIDsTask = function (p_res, p_callback)
{
    if (_.isEmpty(p_res.ids))
    {
        p_callback(null, p_res);
    }
    else
    {
        catalog.saveCatalog(p_res, function ()
        {
            p_callback(null, p_res);
        });
    }
};
