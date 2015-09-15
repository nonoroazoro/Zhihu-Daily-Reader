var _ = require("lodash");
var async = require("async");
var config = require("config");
var moment = require("moment");
var mongoose = require("mongoose");

var utils = require("./utils");
var dbhelper = require("./dbhelper");
var Status = require("../models/status");

exports.fetchStories = function (p_callback)
{
}

function _saveStories()
{
}

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
            ], function (err, result)
            {
                console.log(err);
                console.log(result);
            }
        );
    }
}

/**
 * 初始化，得到爬虫起始日期，例如："20150915"。
 */
function _initTask(done)
{
    Status.findOne({ username: config.username }, function (err, res)
    {
        var date = null;
        if (!err && res)
        {
            date = utils.prevZhihuDay(res.oldest);
        }
        
        if (!date)
        {
            date = utils.prevZhihuDay(utils.convertToZhihuDate(Date.now()));
        }
        
        done(null, date);
    });
}

/**
 * 爬取指定日期的日报。
 */
function _fetchStoriesTask(p_date, done)
{
}