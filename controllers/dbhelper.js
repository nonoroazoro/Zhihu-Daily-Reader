var _ = require("lodash");
var async = require("async");
var config = require("config");
var mongoose = require("mongoose");

/**
 * 连接数据库。
 * @param {Function(err)} [p_callback]
 */
exports.connect = function (p_callback)
{
    mongoose.connect(
        config.db,
        {
            server: {
                auto_reconnect: config.auto_reconnect,
                poolSize: config.poolSize
            },
        },
        function (err)
        {
            _connected = !err;
            _monitor();
            if (_.isFunction(p_callback))
            {
                p_callback(err);
            }
        }
    );
};

var _connected = false;
/**
 * 检查数据库是否已连接。
 */
 exports.connected = function ()
{
    return _connected;
};

/**
 * 删除所有集合。
 * @param {Function(err)} [p_callback]
 */
 exports.dropAllCollections = function (p_callback)
{
    async.each(mongoose.connection.collections, function (collection, done)
    {
        collection.drop(done);
    },
    function (err)
    {
        if (_.isFunction(p_callback))
        {
            if (!err || err.message == "ns not found")
            {
                p_callback()
            }
            else
            {
                p_callback(err);
            }
        }
    });
};

/**
 * 监控数据库状态。
 */
var _monitor = function ()
{
    var db = mongoose.connection.db;
    db.on("reconnect", function ()
    {
        _connected = true;
    });
    
    db.on("close", function ()
    {
        _connected = false;
    });
    
    db.on("error", function ()
    {
        _connected = false;
    });
};