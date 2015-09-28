var _ = require("lodash");
var Status = require("../models/status");

/**
 * 从数据库中查找指定用户的阅读状态。
 * @param {String} p_username 用户名。
 * @param {Function(err, doc)} [p_callback]
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
 * @param {Object} p_status 阅读状态。
 * @param {Function(err, doc)} [p_callback]
 */
exports.saveStatus = function (p_status, p_callback)
{
    if (_.isEmpty(p_status) || !_.isObject(p_status))
    {
        if (_.isFunction(p_callback))
        {
            p_callback(new Error("p_status must be a non-empty Object."))
        }
    }
    else
    {
        Status.findOneAndUpdate(
            { username: p_status.username },
            p_status,
            { new: true, upsert: true },
            p_callback
        );
    }
};
