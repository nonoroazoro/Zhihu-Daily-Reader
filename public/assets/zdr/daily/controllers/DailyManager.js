var $ = require("jquery");

// 缓存日报内容（以 Id 检索，请勿用于检索 index）。
var stories = {};

/**
 * 获取最新热门日报的索引。
 */
function getTopStoryIndexes(callback)
{
    $.get("/api/4/news/top", callback);
}

/**
 * 获取指定日期的日报的索引。
 * @param String p_date 指定的日期。如果小于 20130519，返回值为 {}。
 */
function getStoryIndexes(callback, p_date)
{
    var url = (p_date == null || p_date == "") ? "/api/4/news/before" : "/api/4/news/before/" + p_date;
    $.get(url, callback);
}

/**
 * 获取指定唯一标识的日报。
 * @param String p_id 指定的唯一标识。
 */
function getStory(callback, p_id)
{
    $.get("/api/4/news/" + p_id, function (data)
    {
        stories[p_id] = data;
        callback(data);
    });
}

module.exports.getTopStoryIndexes = getTopStoryIndexes;
module.exports.getStoryIndexes = getStoryIndexes;
module.exports.getStory = getStory;

module.exports.stories = stories;