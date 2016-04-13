var path = require("path");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var CleanWebpackPlugin = require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var mainPath = path.resolve(__dirname, "./client/");
var buildPath = path.resolve(__dirname, "./public/assets/");

module.exports = {
    context: mainPath,
    entry:
    {
        vendor: [
            "jquery",
            "bootstrap",
            "lodash",
            "moment",
            "mousetrap",
            "react",
            "react-dom",
            "react-addons-update",
            "react-addons-pure-render-mixin"
        ],
        zdr: "./zdr",
        error: "./zdr/common/error_404"
    },
    output:
    {
        path: buildPath,
        publicPath: "/assets/",
        filename: "[name].js",
        chunkFilename: "[id].js",
    },
    resolve:
    {
        extensions: ["", ".js", ".jsx"]
    },
    module:
    {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: "babel"
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.less$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            },
            {
                test: /\.(png|jpg)$/,
                exclude: /node_modules/,
                loader: "url?limit=10240"
            },
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                loader: "url?limit=100000&mimetype=application/font-woff"
            },
            {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                exclude: /node_modules/,
                loader: "file"
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([buildPath]),
        new AssetsPlugin(
        {
            filename: "assets.json",
            path: buildPath,
            prettyPrint: true
        }),
        new webpack.optimize.CommonsChunkPlugin(
        {
            name: "vendor",
            filename: "vendor.js",
            minChunks: Infinity
        }),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin("res/[name].css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin(
        {
            "jQuery": "jquery",
        })
    ]
};
