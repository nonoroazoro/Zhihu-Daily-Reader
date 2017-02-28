/**
 * 负责向前端传递知乎日报内容。
 */

const daily = require("../daily");
const story = require("../story");
const catalog = require("../catalog");
const resource = require("../resource");
const dbhelper = require("../dbhelper");

/**
 * 获取最新知乎日报 ID 列表。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
module.exports.getLatestStoryIDs = function (p_res, p_next)
{
    // 注意：最新日报列表优先从知乎服务器获取（不断更新）。
    daily.fetchLatestStoryIDs((err, res) =>
    {
        if (err)
        {
            if (dbhelper.connected())
            {
                catalog.findLatestCatalog((err, doc) =>
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
module.exports.getTopStoryIDs = function (p_res, p_next)
{
    daily.fetchTopStoryIDs((err, res) =>
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
module.exports.getStoryIDs = function (p_date, p_res, p_next)
{
    // 注意：非最新日报列表优先从数据库获取，注意区别。
    if (dbhelper.connected())
    {
        catalog.findCatalogByDate(p_date, (err, doc) =>
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
module.exports.getStory = function (p_id, p_res, p_next)
{
    if (dbhelper.connected())
    {
        story.findStoryByID(p_id, (err, doc) =>
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
module.exports.getImage = function (p_url, p_res, p_next)
{
    if (dbhelper.connected())
    {
        resource.findResourceByID(p_url, (err, doc) =>
        {
            if (err || !doc)
            {
                _fetchImage(p_url, p_res, p_next);
            }
            else
            {
                p_res.contentType(doc.contentType);
                p_res.setHeader("Cache-Control", "max-age=31536000");
                p_res.send(doc.data);
            }
        });
    }
    else
    {
        _fetchImage(p_url, p_res, p_next);
    }
};

function _fetchStoryIDs(p_date, p_res, p_next)
{
    daily.fetchStoryIDs(p_date, (err, res) =>
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
}

function _fetchStory(p_id, p_res, p_next)
{
    daily.fetchStory(p_id, (err, res) =>
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
}

function _fetchImage(p_url, p_res, p_next)
{
    daily.fetchImage(p_url, (err, res) =>
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.contentType(res.contentType);
            p_res.setHeader("Cache-Control", "max-age=31536000");
            p_res.send(res.data);
        }
    });
}
