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
