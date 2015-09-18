var _ = require("lodash");
var Story = require("../models/story");

/**
 * 从数据库中查找指定 Id 的日报。
 * @param  {String} p_id         指定的日报 Id。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findStoryById = function (p_id, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.findOne({ id: p_id }, p_callback);
    }
};

/**
 * 从数据库中查找指定日期的日报。
 * @param  {String} p_date       指定的日期。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findStoriesByDate = function (p_date, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.find({ date: p_date }, p_callback);
    }
};

/**
 * 从数据库中查找指定日期的未读日报。如果未指定，则查找所有未读日报。
 * @param  {String} p_date       指定的日期。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findUnreadStories = function (p_date, p_callback)
{
    if (_.isFunction(p_callback))
    {
        if (_.isEmpty(_.trim(p_date)))
        {
            this.findAllUnreadStories(p_callback);
        }
        else
        {
            Story.find(
                {
                    date: p_date,
                    read: false
                },
                p_callback
            );
        }
    }
};

/**
 * 从数据库中查找所有未读日报。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findAllUnreadStories = function (p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.find({ read: false }, p_callback);
    }
};

/**
 * 从数据库中查找所有未离线的日报 ID。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findUncachedIDs = function (p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.find({ cached: false }, { id: 1, _id: 0 }, p_callback);
    }
};

/**
 * 保存知乎日报至数据库。如果已存在，则更新。
 * @param  {JSONObject} p_story  指定的日报（特指从服务端获取到的 JSON Object）。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.saveStory = function (p_story, p_callback)
{
    if (_.isObject(p_story))
    {
        var query = {
            id: p_story.id
        };
        
        var update = {
            id: p_story.id,
            date: p_story.date,
            content: JSON.stringify(p_story),
            cached: true
        };
        
        var options = {
            new: true,
            upsert: true
        };
        
        Story.findOneAndUpdate(query, update, options, p_callback);
    }
    else
    {
        if (_.isFunction(p_callback))
        {
            p_callback(new Error("p_story is not an Object."))
        }
    }
};

/**
 * 记录未离线或离线失败的知乎日报 Id。如果已存在，则更新。
 * @param  {String} p_id         指定的日报 Id。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.logUncachedStory = function (p_id, p_callback)
{
    Story.findOneAndUpdate({
        id: p_id
    }, {
        id: p_id,
        cached: false
    }, {
        new: true,
        upsert: true
    }, p_callback);
};