/**
 * 负责向前端传递知乎日报内容。
 */

var daily = require("../daily");
var story = require("../story");
var catalog = require("../catalog");
var resource = require("../resource");
var dbhelper = require("../dbhelper");

/**
 * 获取最新知乎日报 ID 列表。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
exports.getLatestStoryIDs = function (p_res, p_next)
{
    // 注意：最新日报列表优先从知乎服务器获取（不断更新）。
    daily.fetchLatestStoryIDs(function (err, res)
    {
        if (err)
        {
            if (dbhelper.connected())
            {
                catalog.findLatestCatalog(function (err, doc)
                {
                    if (err || !doc)
                    {
                        p_next(err);
                    }
                    else
                    {
                        p_res.json(doc);
                    }
                });
            }
            else
            {
                p_next(err);
            }
        }
        else
        {
            p_res.json(res);
        }
    });
};

/**
 * 从知乎日报服务器获取热门日报的 ID 列表。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
exports.getTopStoryIDs = function (p_res, p_next)
{
    daily.fetchTopStoryIDs(function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.json(res.stories);
        }
    });
};

/**
 * 获取指定日期的知乎日报 ID 列表。
 * @param {String} p_date 日期。如果小于"20130519"，返回值为 {}。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
 exports.getStoryIDs = function (p_date, p_res, p_next)
{
    // 注意：非最新日报列表优先从数据库获取，注意区别。
    if (dbhelper.connected())
    {
        catalog.findCatalogByDate(p_date, function (err, doc)
        {
            if (err || !doc)
            {
                _fetchStoryIDs(p_date, p_res, p_next);
            }
            else
            {
                p_res.json(doc);
            }
        });
    }
    else
    {
        _fetchStoryIDs(p_date, p_res, p_next);
    }
};

/**
 * 获取指定 ID 的知乎日报。
 * @param {String} p_id ID。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
 exports.getStory = function (p_id, p_res, p_next)
{
    if (dbhelper.connected())
    {
        story.findStoryByID(p_id, function (err, doc)
        {
            if (err || !doc || !doc.cached)
            {
                _fetchStory(p_id, p_res, p_next);
            }
            else
            {
                p_res.json(doc.content);
            }
        });
    }
    else
    {
        _fetchStory(p_id, p_res, p_next);
    }
};

/**
 * 获取指定图片。
 * @param {String} p_url 地址。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
 exports.getImage = function (p_url, p_res, p_next)
{
    if (dbhelper.connected())
    {
        resource.findResourceByID(p_url, function (err, doc)
        {
            if (err || !doc)
            {
                _fetchImage(p_url, p_res, p_next);
            }
            else
            {
                p_res.contentType(doc.contentType);
                p_res.send(doc.data);
            }
        });
    }
    else
    {
        _fetchImage(p_url, p_res, p_next);
    }
};

var _fetchStoryIDs = function (p_date, p_res, p_next)
{
    daily.fetchStoryIDs(p_date, function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.json(res);
        }
    });
};

var _fetchStory = function (p_id, p_res, p_next)
{
    daily.fetchStory(p_id, function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.json(res.story);
        }
    });
};

var _fetchImage = function (p_url, p_res, p_next)
{
    daily.fetchImage(p_url, function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.contentType(res.contentType);
            p_res.send(res.data);
        }
    });
};
