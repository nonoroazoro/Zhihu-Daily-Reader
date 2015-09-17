var _ = require("lodash");
var async = require("async");
var config = require("config");

var daily = require("./daily");
var status = require("../status");
var utils = require("../utils");
var dbhelper = require("../dbhelper");

/**
 * 启动爬虫。
 */
exports.run = function ()
{
    if (dbhelper.connected())
    {
        async.waterfall(
            [
                _initTask,
            ], function (err, res)
            {
                // TODO:
                console.log(err);
                console.log(res);
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
function _fetchStoriesTask(p_date, done)
{
    daily.cacheStories(p_date, done);
}