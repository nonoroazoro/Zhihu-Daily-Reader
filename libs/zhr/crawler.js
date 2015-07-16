var http = require("http");

/**
 * 从知乎日报获取最新消息。
 */
function getLatestNews(p_callback)
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
                if (p_callback)
                {
                    p_callback(JSON.parse(data));
                }
            });
        }
        else
        {
            if (p_callback)
            {
                p_callback({});
            }
        }
    });
}

exports.getLatestNews = getLatestNews;
