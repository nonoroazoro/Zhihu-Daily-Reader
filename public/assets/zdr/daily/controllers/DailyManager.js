var _ = require("lodash");
var $ = require("jquery");

var _stories = {};

/**
 * 获取目前已从服务端获取到的所有日报内容的缓存（以日报 id 进行检索，无序，请勿用 index 检索）。
 */
function getFetchedStories()
{
    return _stories;
}

/**
 * 获取最新热门日报的索引。
 */
function getTopStoryIndexes(callback)
{
    $.get("/api/4/news/top", function (p_data)
    {
        callback(p_data);
    });
}

/**
 * 获取指定日期的日报的索引。
 * @param String p_date 指定的日期。如果未指定，则返回最新日报的索引；如果小于 20130519，则返回 {}。
 */
function getStoryIndexes(callback, p_date)
{
    if (_.isEmpty(p_date))
    {
        $.get("/api/4/news/before", function (p_data)
        {
            callback(p_data);
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
    $.get("/api/4/news/" + p_id, function (p_data)
    {
        _stories[p_id] = p_data;
        callback(p_data);
    });
}

module.exports.getTopStoryIndexes = getTopStoryIndexes;
module.exports.getStoryIndexes = getStoryIndexes;
module.exports.getStory = getStory;

module.exports.getFetchedStories = getFetchedStories;