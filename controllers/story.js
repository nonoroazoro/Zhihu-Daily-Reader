var _ = require("lodash");
var models = require("../models");
var Story = models.Story;

/**
 * 查找指定 Id 的日报。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 * @param  {String} p_id         指定的日报 Id。
 */
exports.findStoryById = function (p_callback, p_id)
{
    if (_.isFunction(p_callback))
    {
        if (_.isEmpty(p_id))
        {
            p_callback(new Error("p_id is Empty String."), null);
        }
        else
        {
            Story.findOne({ id: p_id }, p_callback);
        }
    }
};

/**
 * 查找指定日期的日报。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 * @param  {String} p_date       指定的日期。
 */
exports.findStoriesByDate = function (p_callback, p_date)
{
    if (_.isFunction(p_callback))
    {
        if (_.isEmpty(p_date))
        {
            p_callback(new Error("p_date is Empty String."), null);
        }
        else
        {
            Story.find({ date: p_date }, p_callback);
        }
    }
};

/**
 * 查找指定日期的未读日报。如果未指定，则查找所有未读日报。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 * @param  {String} p_date       指定的日期。
 */
exports.findUnreadStories = function (p_callback, p_date)
{
    if (_.isFunction(p_callback))
    {
        if (_.isEmpty(p_date))
        {
            Story.find({ read: false }, p_callback);
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