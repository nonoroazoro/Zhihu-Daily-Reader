/**
 * 负责向前端传递知乎日报内容。
 */

var daily = require("../daily");
var request = require("request");

/**
 * 获取最新知乎日报 ID 列表。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
exports.getLatestStoryIDs = function (p_res, p_next)
{
    daily.fetchLatestStoryIDs(function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.set(res.headers);
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
            p_res.set(res.headers);
            p_res.json(res);
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
    daily.fetchStoryIDs(p_date, function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.set(res.headers);
            p_res.json(res);
        }
    });
};

/**
 * 获取指定 ID 的知乎日报。
 * @param {String} p_id ID。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
 exports.getStory = function (p_id, p_res, p_next)
{
    daily.fetchStory(p_id, function (err, res)
    {
        if (err)
        {
            p_next(err);
        }
        else
        {
            p_res.set(res.headers);
            p_res.json(res);
        }
    });
};

/**
 * 获取指定图片。
 * @param {String} p_url 地址。
 * @param {Object} p_res 服务端响应。
 * @param {Object} p_next
 */
 exports.getImage = function (p_url, p_res, p_next)
{
    request.get(p_url)
    .on("error", function ()
    {
        p_next(new Error("request image error."));
    }).pipe(p_res);
};
