var path = require("path");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
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
            "classnames",
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
        path: path.join(buildPath, "/[hash:8]/"),
        publicPath: "/assets/[hash:8]/",
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
                test: /\.woff$/,
                exclude: /node_modules/,
                loader: "url?limit=100000&mimetype=application/font-woff"
            }
        ]
    },
    plugins: [
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
        new webpack.DefinePlugin(
        {
            "process.env":
            {
                NODE_ENV: JSON.stringify("production")
            }
        }),
        new ExtractTextPlugin("res/[name].css"),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin(
        {
            "jQuery": "jquery",
        }),
        new webpack.optimize.UglifyJsPlugin(
        {
            compress:
            {
                warnings: false
            }
        })
    ]
};
