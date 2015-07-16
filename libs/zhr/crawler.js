var http = require("http");

/**
 * 从知乎日报获取最新消息。
 * @param  p_response express 服务端响应。
 */
function getLatestNews(p_response)
{
    http.get("http://news-at.zhihu.com/api/4/news/latest", function (res)
    {
        if (res.statusCode == 200)
        {
            var data = "";
            res.on("data", function (chunk)
            {
                data += chunk;
            }).on("end", function ()
            {
                p_response.json(JSON.parse(data));
            });
        }
        else
        {
            p_response.json({});
        }
    });
}

exports.getLatestNews = getLatestNews;
