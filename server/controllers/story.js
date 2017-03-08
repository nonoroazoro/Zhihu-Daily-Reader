const _ = require("lodash");
const Story = require("../models/story");

/**
 * 从数据库中查找指定 ID 的日报。
 * @param {String} p_id ID。
 * @param {Function(err, doc)} [p_callback]
 */
module.exports.findStoryByID = function (p_id, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.findOne({ id: p_id }, p_callback);
    }
};

/**
 * 从数据库中查找指定日期的日报。
 * @param {String} p_date 日期。
 * @param {Function(err, docs)} [p_callback]
 */
module.exports.findStoriesByDate = function (p_date, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.find({ date: p_date }, p_callback);
    }
};

/**
 * 从数据库中查找指定日期的未读日报。如果未指定，则查找所有未读日报。
 * @param {String} p_date 日期。
 * @param {Function(err, docs)} [p_callback]
 */
module.exports.findUnreadStories = function (p_date, p_callback)
{
    if (_.isFunction(p_date))
    {
        p_callback = p_date;
        p_date = null;
    }
    
    Story.find(
        p_date ? { date: p_date, read: false } : { read: false },
        p_callback
    );
};

/**
 * 从数据库中查找所有未离线的日报 ID。
 * @param {Function(err, docs)} [p_callback]
 */
module.exports.findUncachedIDs = function (p_callback)
{
    if (_.isFunction(p_callback))
    {
        Story.find({ cached: false }, { id: 1 }, p_callback);
    }
};

/**
 * 从数据库中查找满足条件的记录。
 * @param {Object} p_conditions 指定的查询条件。
 * @param {Object} [p_projection]
 * @param {Object} [p_options]
 * @param {Function(err, docs)} [p_callback]
 */
module.exports.query = function (p_conditions, p_projection, p_options, p_callback)
{
    Story.find(p_conditions, p_projection, p_options, p_callback);
};

/**
 * 保存知乎日报至数据库。
 * @param {Object} p_story 指定的日报（特指从服务端获取到的 JSON Object）。
 * @param {Function(err, doc)} [p_callback]
 */
module.exports.saveStory = function (p_story, p_callback)
{
    if (_.isFunction(p_story))
    {
        p_story(new Error("p_story must not be a Function."));
    }
    else if (_.isEmpty(p_story) || !_.isObject(p_story))
    {
        if (_.isFunction(p_callback))
        {
            p_callback(new Error("p_story must be a non-empty Object."));
        }
    }
    else
    {
        const conditions = {
            id: p_story.id
        };
        
        const update = {
            id: p_story.id,
            date: p_story.date,
            content: p_story,
            cached: true
        };
        
        const options = {
            new: true,
            upsert: true
        };
        
        Story.findOneAndUpdate(conditions, update, options, p_callback);
    }
};

/**
 * 记录未离线的知乎日报。
 * @param {String} p_id ID。
 * @param {String} p_date 日期。
 * @param {Function(err, doc)} [p_callback]
 */
module.exports.logUncachedStory = function (p_id, p_date, p_callback)
{
    Story.findOneAndUpdate({
        id: p_id
    }, {
        id: p_id,
        date: p_date,
        cached: false
    }, {
        new: true,
        upsert: true
    }, p_callback);
};

/**
 * 删除数据库中早于指定日期的日报。
 * @param {String} p_date 日期。
 * @param {Function(err, res)} [p_callback]
 */
module.exports.removeOldStories = function (p_date, p_callback)
{
    if (_.isFunction(p_date))
    {
        p_date(new Error("p_date must not be a Function."));
    }
    else
    {
        Story.remove({ date: { $lt: p_date } }, (err, res) =>
        {
            if (_.isFunction(p_callback))
            {
                if (err)
                {
                    p_callback(err);
                }
                else
                {
                    p_callback(null, {
                        date: p_date,
                        success: (res.result.ok == 1),
                        count: res.result.n
                    });
                }
            }
        });
    }
};
