var querystring = require("querystring");

var options = { baseUrl : "http://news-at.zhihu.com/api/4/" };
var dailyRequest = require("request").defaults(options);
var imgRequest = require("request");

const prefix = "/api/4/imgs/";

/**
 * 从知乎日报获取最新消息（包括当日新闻和热点新闻）。
 * @param res 服务端响应。
 */
function getLatestNews(res)
{
    dailyRequest.get({ url: "/news/latest", json: true }, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            var stories = body.stories;
            var storiesLength = stories.length;
            var images = [];
            var imagesLength = 0;
            for (var i = 0; i < storiesLength; i++)
            {
                delete stories[i].type;
                delete stories[i].ga_prefix;
                delete stories[i].multipic;
                
                images = stories[i].images;
                imagesLength = images.length;
                for (var j = 0; j < imagesLength; j++)
                {
                    images[j] = prefix + querystring.escape(images[j]);
                }
            }
            
            stories = body.top_stories;
            storiesLength = stories.length;
            for (var i = 0; i < storiesLength; i++)
            {
                delete stories[i].type;
                delete stories[i].ga_prefix;
                
                stories[i].image = prefix + querystring.escape(stories[i].image);
            }
            
            res.set(response.headers);
            res.json(body);
        }
        else
        {
            res.status(404).send();
        }
    });
}

/**
 * 从知乎日报获取指定图片。
 * @param url 图片地址。
 * @param res 服务端响应。
 */
function getImage(url, res)
{
    imgRequest.get(url)
    .on("error", function (error)
    {
        res.status(404).send();
    }).pipe(res);
}

exports.getLatestNews = getLatestNews;
exports.getImage = getImage;
