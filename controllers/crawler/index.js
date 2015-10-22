var _ = require("lodash");
var async = require("async");
var config = require("config");

var daily = require("./daily");
var story = require("../story");
var status = require("../status");
var utils = require("../utils");
var dbhelper = require("../dbhelper");

var stop = false;

/**
 * 开始爬虫。
 */
exports.start = function ()
{
    stop = false;
    if (dbhelper.connected())
    {
        async.waterfall([
            _cacheLatestTask,
            _cleanCacheTask,
        ], function (err, res)
        {
            console.log(res);
            if (!err)
            {
                _cachePrev(res.date, res.max_age);
            }
        });
    }
};

/**
 * 停止爬虫。
 */
exports.stop = function ()
{
    stop = true;
};

/**
 * 1. 离线 Latest 日报。同时记录最大缓存日期）。
 */
function _cacheLatestTask(p_callback)
{
    daily.cacheLatestStories(function (err, res)
    {
        if (!err)
        {
            res.max_age = utils.subZhihuDate(res.date, config.crawler.max_age);
        }
        p_callback(err, res);
    });
}

/**
 * 2. 清除过期缓存。
 */
function _cleanCacheTask(p_res, p_callback)
{
    story.removeOldStories(p_res.max_age, function ()
    {
        p_callback(null, p_res);
    });
}

/**
 * 爬取指定日期的前一天的日报。
 * @param {String} p_date 日期。
 * @param {String} p_maxDate 允许缓存的最早日期。
 */
function _cachePrev(p_date, p_maxDate)
{
    var prevDate = utils.prevZhihuDay(p_date);
    if (prevDate >= p_maxDate)
    {
        daily.cacheStoriesOfDate(prevDate, function (err, res)
        {
            console.log(res);
            if (!stop)
            {
                setTimeout(function ()
                {
                    _cachePrev(prevDate, p_maxDate);
                }, config.crawler.day_interval * 1000);
            }
        });
    }
    else
    {
        console.log("Cached to max age(" + p_maxDate + "), crawler stopped.");
    }
}
