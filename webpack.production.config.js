var path = require("path");
var webpack = require("webpack");
var config = require("./webpack.base.config");

var hash = "/[hash:8]/";
config.output.path = path.join(config.output.path, hash);
config.output.publicPath = path.join(config.output.publicPath, hash);

config.plugins.push(
    new webpack.DefinePlugin(
    {
        "process.env":
        {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin(
    {
        compress:
        {
            warnings: false
        }
    })
);

module.exports = config;
