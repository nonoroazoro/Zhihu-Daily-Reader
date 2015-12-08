var _ = require("lodash");
var Resource = require("../models/resource");

/**
 * 保存资源至数据库。如果已存在，则更新。
 * @param {Object} p_resource 资源。
 * @param {Function(err, doc)} [p_callback]
 */
exports.saveResource = function (p_resource, p_callback)
{
    if (_.isEmpty(p_resource) || !_.isObject(p_resource))
    {
        if (_.isFunction(p_callback))
        {
            p_callback(new Error("p_resource must be a non-empty Object."))
        }
    }
    else
    {
        Resource.findOneAndUpdate(
            { id: p_resource.id },
            p_resource,
            { new: true, upsert: true },
            p_callback
        );
    }
};

/**
 * 从数据库中查找指定 ID 的资源。
 * @param {String} p_id ID。
 * @param {Function(err, doc)} [p_callback]
 */
exports.findResourceByID = function (p_id, p_callback)
{
    if (_.isFunction(p_callback))
    {
        Resource.findOne({ id: p_id }, p_callback);
    }
};
