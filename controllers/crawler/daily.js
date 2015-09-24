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
 * @param  {Function} p_callback 回调函数：function(err, res)。
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
            p_callback(new Error("request zhihu-daily api ('/news/latest') error:" + err.message), null);
        }
    });
};

/**
 * 从知乎日报服务器获取指定日期的知乎日报 ID 列表。
 * @param  {String} p_date       指定的日期。如果小于 20130519，返回值 res 为 {}。
 * @param  {Function} p_callback 回调函数：function(err, res)。
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
            // 20130519 之前是没有知乎日报的。
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
                    p_callback(new Error("request zhihu-daily api ('/news/before/:date') error:" + err.message), null);
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
 * @param  {String} p_id         指定的 ID。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.fetchStory = function (p_id, p_callback)
{
    if (!_.isFunction(p_callback)) return;
    
    // 首先检查 ID 是否为纯数字。
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
                p_callback(new Error("request zhihu-daily api ('/news/:id') error:" + err.message), null);
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
 * @param  {String} p_id         知乎日报 ID。
 * @param  {String} p_date       日报对应的日期。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.cacheStory = function (p_id, p_date, p_callback)
{
    async.retry({
        times: config.crawler.daily_retry,
        interval: config.crawler.daily_interval * 1000
    }, this.fetchStory.bind(this, p_id), function (err, res)
    {
        // 记录未成功抓取的日报。
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
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.cacheLatestStories = function (p_callback)
{
    async.waterfall(
        [
            _fetchLatestStoryIDsTask.bind(this),
            _preprocessTask,
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 离线指定日期的知乎日报。
 * @param  {String} p_date       指定的日期。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.cacheStoriesOfDate = function (p_date, p_callback)
{
    async.waterfall(
        [
            _fetchStoryIDsTask.bind(this, p_date),
            _preprocessTask,
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 离线知乎日报。
 * @param  {Array} p_ids         指定的知乎日报 ID 列表。
 * @param  {String} p_date       指定的日期。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.cacheStories = function (p_ids, p_date, p_callback)
{
    async.waterfall(
        [
            _preprocessTask.bind(this, p_ids, p_date),
            _cacheStoriesTask.bind(this)
        ],
        p_callback
    );
};

/**
 * 预处理：排除已离线的日报。
 */
function _preprocessTask(p_ids, p_date, p_callback)
{
    story.query({
        date: p_date,
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
            _.remove(p_ids, function (id)
            {
                return _.indexOf(cachedIDs, id) != -1;
            });
        }
        p_callback(null, p_ids, p_date);
    });
}

/**
 * 获取最新的知乎日报 ID 列表。
 */
function _fetchLatestStoryIDsTask(p_callback)
{
    this.fetchLatestStoryIDs(function (err, res)
    {
        if (err)
        {
            p_callback(err);
        }
        else
        {
            p_callback(null, res.ids, res.date);
        }
    });
}

/**
 * 获取指定日期的知乎日报 ID 列表。
 */
function _fetchStoryIDsTask(p_date, p_callback)
{
    this.fetchStoryIDs(p_date, function (err, res)
    {
        if (err)
        {
            p_callback(err);
        }
        else
        {
            p_callback(null, res.ids, res.date);
        }
    });
}

/**
 * 离线知乎日报。
 */
function _cacheStoriesTask(p_ids, p_date, p_callback)
{
    var result = { date: p_date, cached: [] };
    async.eachSeries(p_ids, function (id, done)
    {
        this.cacheStory(id, p_date, function (err, res)
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
 * @param  {String} p_url        指定的图片地址。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.fetchImage = function (p_url, p_res)
{
    if (!_.isFunction(p_callback)) return;
    // TODO:
};
