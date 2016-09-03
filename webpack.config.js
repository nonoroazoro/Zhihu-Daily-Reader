const webpack = require("webpack");
const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.module.preLoaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint"
    }
];

config.plugins.push(
    new ExtractTextPlugin("res/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        filename: "vendor.js",
        minChunks: Infinity
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["vendor.js"],
        columns: false,
        module: false
    })
);

module.exports = config;
