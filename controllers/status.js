var _ = require("lodash");
var Status = require("../models/status");

/**
 * 从数据库中查找指定用户的阅读状态。
 * @param  {String} p_username   指定的用户名。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.findStatusByUsername = function (p_username, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Status.findOne({ username: p_username }, p_callback);
    }
};

/**
 * 保存阅读状态至数据库。如果已存在，则更新。
 * @param  {JSONObject} p_status 指定的阅读状态。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 */
exports.saveStatus = function (p_status, p_callback)
{
    if (_.isObject(p_status))
    {
        var query = {
            username: p_status.username
        };
        
        var options = {
            new: true,
            upsert: true
        };
        
        Status.findOneAndUpdate(query, p_status, options, p_callback);
    }
    else
    {
        if (_.isFunction(p_callback))
        {
            p_callback(new Error("p_status is not an Object."))
        }
    }
};