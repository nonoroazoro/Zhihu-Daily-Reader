var config = require("config");
var mongoose = require("mongoose");

/**
 * 连接数据库。
 */
function connectDB(callback)
{
    mongoose.connect(
        config.db,
        {
            server: {
                auto_reconnect: config.auto_reconnect,
                poolSize: config.poolSize
            },
        },
        callback
    );
}

/**
 * 检查是否已连接数据库。
 */
function connected()
{
    return mongoose.connection.db != null;
}

exports.connected = connected;
exports.connectDB = connectDB;
exports.Story = require("./story");
