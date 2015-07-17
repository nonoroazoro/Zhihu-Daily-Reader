var options = { baseUrl : "http://news-at.zhihu.com/api/4/" };
var request = require("request").defaults(options);

// Debug
var log = require("util").log;

/**
 * 从知乎日报获取最新消息。
 * @param  p_response express 服务端响应。
 */
function getLatestNews(p_response)
{
    request.get("/news/latest", function (err, res, body)
    {
        log("GET /news/latest");
        if (!err && res.statusCode == 200)
        {
            p_response.json(JSON.parse(body));
        }
        else
        {
            p_response.json({});
        }
    });
}

exports.getLatestNews = getLatestNews;
