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
                auto_reconnect: config.autoReconnect,
                poolSize: config.poolSize
            },
        },
        callback
    );
}

exports.connectDB = connectDB;
exports.Story = require("./story");
