var $ = require("jquery");

/**
 * 获取最新热门日报。
 */
function getTopStories(callback)
{
    $.get("/api/4/news/top", callback);
}

/**
 * 获取指定日期的日报。
 * @param String p_date 指定的日期。如果小于 20130519，返回值为 {}。
 */
function getStories(callback, p_date)
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
    $.get("/api/4/news/" + p_id, callback);
}

module.exports.getTopStories = getTopStories;
module.exports.getStories = getStories;
module.exports.getStory = getStory;