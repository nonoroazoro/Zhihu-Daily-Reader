var $ = require("jquery");

/**
 * 获取最新热门日报。
 */
function getTopStories(callback)
{
    $.get("/api/4/news/top", callback);
}

module.exports.getTopStories = getTopStories;