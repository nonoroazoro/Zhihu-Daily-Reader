var fs = require("fs");
var _ = require("lodash");
var path = require("path");
var async = require("async");
var config = require("config");
var cp = require("child_process");
var mongoose = require("mongoose");

/**
 * 启动数据库（Server）。
 * @param {Function(err)} [p_callback]
 */
exports.start = function (p_callback)
{
    var dbpath = path.resolve(__dirname, "../db");
    if (!fs.existsSync(dbpath))
    {
        fs.mkdirSync(dbpath);
    }
    
    if (fs.existsSync(dbpath))
    {
        cp.execFile("mongod", ["--dbpath", dbpath]);
        setTimeout(p_callback, 1000);
    }
    else
    {
        p_callback(new Error("Can not find/create database dir: " + dbpath));
    }
};

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
                p_callback();
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