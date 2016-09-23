const webpack = require("webpack");
const WebpackMd5Hash = require("webpack-md5-hash");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require("./webpack.base.config");

config.output.filename = "[name].[chunkhash:8].js";
config.output.chunkFilename = "[id].[chunkhash:8].chunk.js";

// config.devtool = "cheap-module-source-map";

config.plugins.push(
    new WebpackMd5Hash(),
    new ExtractTextPlugin("res/[name].[contenthash:8].css"),
    new webpack.DefinePlugin({
        "process.env":
        {
            NODE_ENV: JSON.stringify("production")
        }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        compress:
        {
            warnings: false
        }
    })
);

module.exports = config;
