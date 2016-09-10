"use strict";

const fs = require("fs");
const _ = require("lodash");
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
    _prepareMongoDB(dbpath, (err) =>
    {
        if (err)
        {
            p_callback(err);
        }
        else
        {
            const timer = setTimeout(p_callback, 2000);
            cp.exec(`mongod --dbpath "${dbpath}"`, (err) =>
            {
                if (err)
                {
                    clearTimeout(timer);
                    p_callback(err);
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
    mongoose.connect(
        config.db,
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
    fs.mkdir(p_dbpath, () =>
    {
        fs.stat(p_dbpath, (err) =>
        {
            if (err)
            {
                p_callback(new Error(`Can not create database dir: ${p_dbpath}`));
            }
            else
            {
                _repairMongoDB(p_dbpath);
                p_callback();
            }
        });
    });
}

/**
 * 修复未正常关闭的数据库。
 */
function _repairMongoDB(p_dbpath)
{
    try
    {
        fs.unlinkSync(path.resolve(p_dbpath, "mongod.lock"));
    }
    catch (e)
    {
    }
}
