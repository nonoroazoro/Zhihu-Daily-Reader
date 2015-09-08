var mongoose = require("mongoose");
var config = require("config");

var options = {
    server: {
        auto_reconnect: config.autoReconnect,
        poolSize: config.poolSize
    },
};

mongoose.connect(config.db, options, function (err)
{
    if (err)
    {
        console.error("Database Server not started, some features will be shut down.");
    }
    else
    {
        console.error("Database Server connected: Mongodb");
    }
});

exports.Story = require("./story");
