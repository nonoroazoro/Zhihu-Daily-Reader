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

config.module.loaders.push(
    {
        test: /\.(png|jpg)$/,
        exclude: /node_modules/,
        loader: "url?limit=10000&name=res/[name].[ext]"
    },
    {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url?limit=10000&mimetype=application/font-woff&name=res/[name].[ext]"
    },
    {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file?limit=10000&name=res/[name].[ext]"
    }
);

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
