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
        console.error("Failed connecting to %s: ", config.db, err.message);
    }
});

exports.Story = require("./story");
