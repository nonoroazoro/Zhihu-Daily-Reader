var moment = require("moment");
var cheerio = require("cheerio");
var querystring = require("querystring");

var options = { baseUrl : "http://news-at.zhihu.com/api/4/" };
var dailyRequest = require("request").defaults(options);
var imgRequest = require("request");

const PREFIX = "/api/4/imgs/";

/**
 * 获取最新日报（即今天截止目前为止的日报）的索引。
 */
function getLatestStoryIndexes(p_res)
{
    dailyRequest.get({ url: "/news/latest", json: true }, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            // 因知乎日报的 API 返回的图片太小，这里直接丢弃，后面再通过其他途径获取图片。
            var indexes = body.stories.map(function (item)
            {
                return item.id;
            });
            
            p_res.set(response.headers);
            p_res.json({
                date: body.date,
                indexes: indexes
            });
        }
        else
        {
            p_res.status(404).render("error_404");
        }
    });
}

/**
 * 获取最新热门日报的索引。
 */
function getTopStoryIndexes(p_res)
{
    dailyRequest.get({ url: "/news/latest", json: true }, function (error, response, body)
    {
        if (!error && response.statusCode == 200)
        {
            var indexes = body.top_stories.map(function (item)
            {
                return {
                    id: item.id,
                    title: item.title,
                    image: PREFIX + querystring.escape(item.image)
                };
            });
            
            p_res.set(response.headers);
            p_res.json({
                date: body.date,
                indexes: indexes
            });
        }
        else
        {
            p_res.status(404).render("error_404");
        }
    });
}

/**
 * 获取指定日期的日报的索引。
 * @param String p_date 指定的日期。如果小于 20130519，返回值为 {}。
 */
function getStoryIndexes(p_date, p_res)
{
    var m = moment(p_date, "YYYYMMDD", true);
    if (m.isValid())
    {
        // 因知乎日报 API 返回的是指定日期的前一天的日报，所以要加一天才能获取指定日期的日报。
        var date = m.add(1, "day").format("YYYYMMDD");
        dailyRequest.get({ url: "/news/before/" + date, json: true }, function (error, response, body)
        {
            if (!error && response.statusCode == 200)
            {
                // 因知乎日报的 API 返回的图片太小，这里直接丢弃，后面再通过其他途径获取图片。
                var indexes = body.stories.map(function (item)
                {
                    return item.id;
                });
                
                p_res.set(response.headers);
                p_res.json({
                    date: body.date,
                    indexes: indexes
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
 * 获取指定唯一标识的日报。
 * @param String p_id 指定的唯一标识。
 */
function getStory(p_id, p_res)
{
    // 首先检查 Id 是否为纯数字。
    if (/^\d+$/.test(p_id))
    {
        dailyRequest.get({ url: "/news/" + p_id, json: true }, function (error, response, body)
        {
            if (!error && response.statusCode == 200)
            {
                var result = {};
                result.id = body.id;
                result.title = body.title;
                result.image = PREFIX + querystring.escape(body.image);
                result.imageSource = body.image_source;
                result.shareURL = body.share_url;
                
                if (body.body)
                {
                    var $ = cheerio.load(body.body, { decodeEntities: false });
                    result.backgrounds = $(".headline>.headline-background .headline-background-link").map(function (i, e)
                    {
                        return {
                            href: $(e).attr("href"),
                            title : $(e).children(".heading").text(),
                            text : $(e).children(".heading-content").text()
                        };
                    }).get();
                    
                    result.contents = $(".content-inner>.question").map(function (i, e)
                    {
                        var question = {};
                        question.title = $(e).children(".question-title").text();
                        question.answers = $(e).children(".answer").map(function (i, e)
                        {
                            $(e).find(".content img.content-image").each(function (i, e)
                            {
                                var src = $(e).attr("src");
                                if (src != null && src != "")
                                {
                                    $(e).attr("src", PREFIX + querystring.escape(src));
                                }
                            });
                            
                            var avatar = $(e).find(".meta>.avatar").attr("src");
                            if (avatar != null && avatar != "")
                            {
                                avatar = PREFIX + querystring.escape(avatar);
                            }
                            else
                            {
                                avatar = "";
                            }
                            
                            return {
                                avatar : avatar,
                                name: $(e).find(".meta>.author").text(),
                                bio : $(e).find(".meta>.bio").text(),
                                content : $(e).children(".content").html()
                            };
                        }).get();
                        
                        var a = $(e).find(".view-more>a");
                        question.link = {
                            href : a.attr("href"),
                            text : a.text(),
                        };
                        
                        return question;
                    }).get();
                }
                
                p_res.set(response.headers);
                p_res.json(result);
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

exports.getLatestStoryIndexes = getLatestStoryIndexes;
exports.getTopStoryIndexes = getTopStoryIndexes;
exports.getStoryIndexes = getStoryIndexes;
exports.getStory = getStory;
exports.getImage = getImage;
