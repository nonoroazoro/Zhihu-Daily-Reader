var _ = require("lodash");
var Status = require("../models/status");

/**
 * 从数据库中查找指定用户的阅读状态。
 * @param  {Function} p_callback 回调函数：function(err, res)。
 * @param  {String} p_username   指定的用户名。
 */
exports.findStatusByUsername = function (p_callback, p_username)
{
    if (_.isFunction(p_callback))
    {
        if (_.isEmpty(_.trim(p_username)))
        {
            p_callback(new Error("p_username is an empty string."), null);
        }
        else
        {
            Status.findOne({ username: p_username }, p_callback);
        }
    }
};
