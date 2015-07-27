var _ = require("lodash");
var $ = require("jquery");

var _stories = {};

/**
 * 获取目前已加载的所有日报内容的缓存（以 Id 进行检索，无序，请勿用 index 检索）。
 */
function getStories()
{
    return _stories;
}

var _today = null;

/**
 * 获取知乎日报当前日期，例如"20170727"。
 */
function getToday()
{
    return _today;
}

/**
 * 获取最新热门日报的索引。
 */
function getTopStoryIndexes(callback)
{
    $.get("/api/4/news/top", function (data)
    {
        if (!_.isEqual(_today, data.date))
        {
            _today = data.date;
        }
        callback(data);
    });
}

/**
 * 获取指定日期的日报的索引。
 * @param String p_date 指定的日期。如果小于 20130519，返回值为 {}。
 */
function getStoryIndexes(callback, p_date)
{
    if (_.isEmpty(_today))
    {
        $.get("/api/4/news/before", function (data)
        {
            if (!_.isEqual(_today, data.date))
            {
                _today = data.date;
            }
            callback(data);
        });
    }
    else
    {
        $.get("/api/4/news/before/" + p_date, callback);
    }
}

/**
 * 获取指定唯一标识的日报。
 * @param String p_id 指定的唯一标识。
 */
function getStory(callback, p_id)
{
    $.get("/api/4/news/" + p_id, function (data)
    {
        _stories[p_id] = data;
        callback(data);
    });
}

module.exports.getTopStoryIndexes = getTopStoryIndexes;
module.exports.getStoryIndexes = getStoryIndexes;
module.exports.getStory = getStory;

module.exports.getStories = getStories;
module.exports.getToday = getToday;