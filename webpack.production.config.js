const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.base.config");

const hash = "[hash:8]/";
config.output.path = path.join(config.output.path, hash);
config.output.publicPath = config.output.publicPath + hash;

config.plugins.push(
    new webpack.DefinePlugin({
        "process.env":
        {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress:
        {
            warnings: false
        }
    })
);

module.exports = config;
