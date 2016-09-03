const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.output.filename = "[name].[hash:8].js";
config.output.chunkFilename = "[id].[hash:8].js";

config.plugins.push(
    new ExtractTextPlugin("res/[name].[hash:8].css"),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.[hash:8].js",
        minChunks: Infinity
    }),
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
