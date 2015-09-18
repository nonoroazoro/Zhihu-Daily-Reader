var _ = require("lodash");
var async = require("async");
var config = require("config");

var daily = require("./daily");
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
    _run();
};

/**
 * 停止爬虫。
 */
exports.stop = function ()
{
    stop = true;
};

/**
 * 爬虫。
 */
function _run()
{
    if (dbhelper.connected())
    {
        async.waterfall(
            [
                _initTask,
                _cacheStoriesTask
            ], function (err, res)
            {
                console.log(res);
                if (!stop)
                {
                    setTimeout(function ()
                    {
                        _run();
                    }, config.crawler.day_interval);
                }
            }
        );
    }
}

/**
 * 初始化，得到爬虫起始日期，例如："20150915"。
 */
function _initTask(done)
{
    status.findStatusByUsername(config.username, function (err, res)
    {
        var date = null;
        if (!err && res)
        {
            date = utils.prevZhihuDay(res.oldest);
        }
        
        if (!date)
        {
            date = utils.convertToZhihuDate(new Date());
        }
        
        done(null, date);
    });
}

/**
 * 爬取指定日期的日报。
 */
function _cacheStoriesTask(p_date, done)
{
    daily.cacheStories(p_date, function (error, result)
    {
        status.saveStatus({
            username: config.username,
            oldest: p_date
        }, function (err, res)
        {
            done(error, result);
        });
    });
}