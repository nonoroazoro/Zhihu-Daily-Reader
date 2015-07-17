var options = { baseUrl : "http://news-at.zhihu.com/api/4/" };
var dailyRequest = require("request").defaults(options);
var imgRequest = require("request");

/**
 * 从知乎日报获取最新消息。
 * @param res 服务端响应。
 */
function getLatestNews(res)
{
    dailyRequest.get("/news/latest").pipe(res);
}

/**
 * 从知乎日报获取指定图片。
 * @param url 图片地址。
 * @param res 服务端响应。
 */
function getImage(url, res)
{
    imgRequest.get(url).pipe(res);
}

exports.getLatestNews = getLatestNews;
exports.getImage = getImage;
