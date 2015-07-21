var moment = require("moment");
var querystring = require("querystring");

var options = { baseUrl : "http://news-at.zhihu.com/api/4/" };
var dailyRequest = require("request").defaults(options);
var imgRequest = require("request");

const PREFIX = "/api/4/imgs/";

var today = null;

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
                    images[j] = PREFIX + querystring.escape(images[j]);
                }
            }
            
            stories = body.top_stories;
            storiesLength = stories.length;
            for (var i = 0; i < storiesLength; i++)
            {
                delete stories[i].type;
                delete stories[i].ga_prefix;
                
                stories[i].image = PREFIX + querystring.escape(stories[i].image);
            }
            
            res.set(response.headers);
            res.json(body);
        }
        else
        {
            p_res.status(404).render("error_404");
        }
    });
}

/**
 * 获取最新热门日报。
 */
function getTopStories(p_res)
{
    dailyRequest.get({ url: "/news/latest", json: true }, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            var stories = body.top_stories.map(function (item)
            {
                return {
                    id: item.id,
                    title: item.title,
                    image: PREFIX + querystring.escape(item.image)
                };
            });
            
            today = body.date;
            p_res.set(response.headers);
            p_res.json({
                date: body.date,
                stories: stories
            });
        }
        else
        {
            p_res.status(404).render("error_404");
        }
    });
}

/**
 * 获取指定日期的日报。
 * @param String p_date 指定的日期。如果小于 20130519，返回值为 {}；如果未指定，则返回最新日报。
 */
function getStories(p_date, p_res)
{
    var m = moment(p_date || today, "YYYYMMDD", true);
    if (m.isValid())
    {
        // 因知乎日报 API 返回的是指定日期的前一天的日报，所以要加一天才能获取指定日期的日报。
        var date = m.add(1, "day").format("YYYYMMDD");
        dailyRequest.get({ url: "/news/before/" + date, json: true }, function (error, response, body)
        {
            if (!error && response.statusCode == 200)
            {
                // 因知乎日报的 API 返回的图片太小，这里直接丢弃，后面再通过其他途径获取图片。
                var stories = body.stories.map(function (item)
                {
                    return {
                        id: item.id,
                        title: item.title,
                    };
                });
                
                p_res.set(response.headers);
                p_res.json({
                    date: body.date,
                    stories: stories
                });
            }
            else
            {
                p_res.status(404).render("error_404");
            }
        });
    }
    else
    {
        p_res.status(404).render("error_404");
    }
}

/**
 * 获取指定图片。
 * @param p_url 图片地址。
 */
function getImage(p_url, p_res)
{
    imgRequest.get(p_url)
    .on("error", function ()
    {
        p_res.status(404).render("error_404");
    }).pipe(p_res);
}

exports.today = today;
exports.getLatestNews = getLatestNews;
exports.getTopStories = getTopStories;
exports.getStories = getStories;
exports.getImage = getImage;
