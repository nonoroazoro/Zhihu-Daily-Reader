const path = require("path");
const webpack = require("webpack");
const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.output.filename = "[name].[hash:8].js";
config.output.chunkFilename = "[id].[hash:8].js";

config.module.loaders.push(
    {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: "url?limit=10000&name=res/[name].[hash:8].[ext]"
    },
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=res/[name].[hash:8].[ext]"
    },
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?limit=10000&name=res/[name].[hash:8].[ext]"
    }
);

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
