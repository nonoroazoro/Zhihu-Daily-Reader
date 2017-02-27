"use strict";

const _ = require("lodash");
const fs = require("fs-extra");
const path = require("path");
const async = require("async");
const config = require("config");
const cp = require("child_process");
const mongoose = require("mongoose");

let _connected = false;

/**
 * 启动数据库 Server。
 * @param {Function(err)} [p_callback]
 */
module.exports.start = function (p_callback)
{
    const dbpath = path.resolve(__dirname, "../db");
    _prepareMongoDB(dbpath, (err1) =>
    {
        if (err1)
        {
            p_callback(err1);
        }
        else
        {
            const timer = setTimeout(p_callback, 2000);
            cp.exec(`mongod --dbpath "${dbpath}"`, (err2) =>
            {
                if (err2)
                {
                    clearTimeout(timer);
                    p_callback(err2);
                }
            });
        }
    });
};

/**
 * 连接数据库。
 * @param {Function(err)} [p_callback]
 */
module.exports.connect = function (p_callback)
{
    const connection = process.env.MONGODB_CONNECTION ? process.env.MONGODB_CONNECTION : config.db;
    mongoose.connect(
        connection,
        {
            server: {
                auto_reconnect: config.auto_reconnect,
                poolSize: config.poolSize
            }
        },
        (err) =>
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

/**
 * 检查数据库是否已连接。
 */
module.exports.connected = function ()
{
    return _connected;
};

/**
 * 删除所有集合。
 * @param {Function(err)} [p_callback]
 */
module.exports.dropAllCollections = function (p_callback)
{
    async.each(
        mongoose.connection.collections,
        (collection, done) =>
        {
            collection.drop(done);
        },
        (err) =>
        {
            if (_.isFunction(p_callback))
            {
                if (!err || err.message === "ns not found")
                {
                    p_callback();
                }
                else
                {
                    p_callback(err);
                }
            }
        }
    );
};

/**
 * 监控数据库状态。
 */
function _monitor()
{
    const db = mongoose.connection.db;
    db.on("reconnect", () =>
    {
        _connected = true;
    });

    db.on("close", () =>
    {
        _connected = false;
    });

    db.on("error", () =>
    {
        _connected = false;
    });
}

function _prepareMongoDB(p_dbpath, p_callback)
{
    fs.mkdirs(p_dbpath, (err1) =>
    {
        if (err1)
        {
            p_callback(new Error(`Can not find or create database dir: ${p_dbpath}`));
        }
        else
        {
            _repairMongoDB(p_dbpath, (err2) =>
            {
                if (err2)
                {
                    p_callback(new Error("Database is broken, can not auto-repair"));
                }
                else
                {
                    p_callback();
                }
            });
        }
    });
}

/**
 * 修复未正常关闭的数据库。
 */
function _repairMongoDB(p_dbpath, p_callback)
{
    fs.remove(path.resolve(p_dbpath, "mongod.lock"), p_callback);
}
