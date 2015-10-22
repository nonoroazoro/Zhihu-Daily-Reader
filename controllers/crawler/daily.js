var _ = require("lodash");
var async = require("async");
var config = require("config");
var cheerio = require("cheerio");
var querystring = require("querystring");
var dailyRequest = require("request").defaults({
    baseUrl : config.zhihu_daily_api
});

var story = require("../story");
var utils = require("../utils");
const PREFIX = "/api/4/imgs/";

/**
 * 从知乎日报服务器获取最新的知乎日报 ID 列表。
 * @param {Function(err, res)} [p_callback]
 */
exports.fetchLatestStoryIDs = function (p_callback)
{
    if (!_.isFunction(p_callback)) return;
    
    dailyRequest.get({ url: "/news/latest", json: true }, function (err, res, body)
    {
        if (!err && res.statusCode == 200)
        {
            // 因知乎日报的 API 返回的图片太小，这里直接丢弃，后面再通过其他途径获取图片。
            p_callback(null, {
                date: body.date,
                ids: body.stories.map(function (value)
                {
                    return value.id;
                })
            });
        }
        else
        {
            p_callback(new Error("request zhihu-daily api ('/news/latest') error."), null);
        }
    });
};

/**
 * 从知乎日报服务器获取指定日期的知乎日报 ID 列表。
 * @param {String} p_date 日期。如果小于"20130519"，返回值 res 为 {}。
 * @param {Function(err, res)} [p_callback]
 */
exports.fetchStoryIDs = function (p_date, p_callback)
{
    if (!_.isFunction(p_callback)) return;
    
    // 因知乎日报 API 返回的是指定日期的前一天的日报，
    // 所以要加一天才能获取指定日期的日报。
    var date = utils.nextZhihuDay(p_date);
    if (date)
    {
        if (utils.convertZhihuDateToMoment(date).isBefore(utils.MIN_DATE))
        {
            // "20130519"之前是没有知乎日报的。
            p_callback(null, {});
        }
        else
        {
            dailyRequest.get({ url: "/news/before/" + date, json: true }, function (err, res, body)
            {
                if (!err && res.statusCode == 200)
                {
                    p_callback(null, {
                        date: body.date,
                        ids: body.stories.map(function (value)
                        {
                            return value.id;
                        })
                    });
                }
                else
                {
                    p_callback(new Error("request zhihu-daily api ('/news/before/:date') error."), null);
                }
            });
        }
    }
    else
    {
        p_callback(new Error("p_date has a wrong format."), null);
    }
};

/**
 * 从知乎日报服务器获取指定 ID 的知乎日报。
 * @param {String} p_id ID。
 * @param {Function(err, res)} [p_callback]
 */
exports.fetchStory = function (p_id, p_callback)
{
    if (!_.isFunction(p_callback)) return;
    
    // 检查 ID 是否为纯数字。
    if (/^\d+$/.test(p_id))
    {
        dailyRequest.get({ url: "/news/" + p_id, json: true }, function (err, res, body)
        {
            if (!err && res.statusCode == 200)
            {
                var result = {};
                result.id = body.id;
                result.title = body.title;
                
                // TODO: 图片暂时不入库，后面再说。
                result.image = PREFIX + querystring.escape(body.image);
                
                result.imageSource = body.image_source;
                result.shareURL = body.share_url;
                
                if (body.body)
                {
                    var $ = cheerio.load(body.body, { decodeEntities: false });
                    result.backgrounds = $(".headline>.headline-background .headline-background-link").map(function (i, e)
                    {
                        return {
                            href: $(e).attr("href"),
                            title : $(e).children(".heading").text(),
                            text : $(e).children(".heading-content").text()
                        };
                    }).get();
                    
                    result.contents = $(".content-inner>.question").map(function (i, e)
                    {
                        var question = {};
                        question.title = $(e).children(".question-title").text();
                        question.answers = $(e).children(".answer").map(function (i, e)
                        {
                            // TODO: 图片暂时不入库，后面再说。
                            $(e).find(".content img").each(function (i, e)
                            {
                                var src = $(e).attr("src");
                                if (src != null && src != "")
                                {
                                    $(e).attr("src", PREFIX + querystring.escape(src));
                                }
                            });
                            
                            // TODO: 图片暂时不入库，后面再说。
                            var avatar = $(e).find(".meta>.avatar").attr("src");
                            if (avatar != null && avatar != "")
                            {
                                avatar = PREFIX + querystring.escape(avatar);
                            }
                            else
                            {
                                avatar = "";
                            }
                            
                            return {
                                avatar : avatar,
                                name: $(e).find(".meta>.author").text(),
                                bio : $(e).find(".meta>.bio").text(),
                                content : $(e).children(".content").html()
                            };
                        }).get();
                        
                        var a = $(e).find(".view-more>a");
                        if (a.length > 0)
                        {
                            question.link = {
                                href : a.attr("href"),
                                text : a.text(),
                            };
                        }
                        
                        return question;
                    }).get();
                }
                p_callback(null, result);
            }
            else
            {
                p_callback(new Error("request zhihu-daily api ('/news/:id') error."), null);
            }
        });
    }
    else
    {
        p_callback(new Error("p_id has a wrong format."), null);
    }
};

/**
 * 离线指定的日报。
 * @param {String} p_id ID。
 * @param {String} p_date 日期。
 * @param {Function(err, res)} [p_callback]
 */
exports.cacheStory = function (p_id, p_date, p_callback)
{
    async.retry({
        times: config.crawler.daily_retry,
        interval: config.crawler.daily_interval * 1000
    }, this.fetchStory.bind(this, p_id), function (err, res)
    {
        // 不管抓取失败与否，都将 ID 记录下来（完备）。
        if (err)
        {
            story.logUncachedStory(p_id, p_date, p_callback);
        }
        else
        {
            res.date = p_date;
            story.saveStory(res, p_callback);
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
            this.fetchLatestStoryIDs,
            _preprocessTask,
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 离线指定日期的知乎日报。
 * @param {String} p_date 指定的日期。
 * @param {Function(err, res)} [p_callback]
 */
exports.cacheStoriesOfDate = function (p_date, p_callback)
{
    async.waterfall(
        [
            this.fetchStoryIDs.bind(this, p_date),
            _preprocessTask,
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 离线知乎日报。
 * @param {String} p_date 日期。
 * @param {Array} p_ids ID 列表。
 * @param {Function(err, res)} [p_callback]
 */
exports.cacheStories = function (p_date, p_ids, p_callback)
{
    var res = { date: p_date, ids: p_ids };
    async.waterfall(
        [
            _preprocessTask.bind(this, res),
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
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
    }, function (err , res)
    {
        if (!err && res)
        {
            var cachedIDs = _.map(res, function (value)
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
        this.cacheStory(id, p_res.date, function (err, res)
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
 * 从知乎日报服务器获取获取指定的图片。
 * @param {String} p_url 图片地址。
 * @param {Function(err, res)} [p_callback]
 */
exports.fetchImage = function (p_url, p_callback)
{
    if (!_.isFunction(p_callback)) return;
    // TODO:
};
