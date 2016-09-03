const path = require("path");
const webpack = require("webpack");
const AssetsPlugin = require("assets-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const mainPath = path.resolve(__dirname, "./client/");
const buildPath = path.resolve(__dirname, "./public/assets/");

module.exports = {
    context: mainPath,
    entry:
    {
        vendor: ["./zdr/common/vendor"],
        zdr: ["./zdr"],
        auth: ["./zdr/auth/res/login.less"],
        error: ["./zdr/common/res/errors.less"]
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
                loaders: ["babel"]
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            },
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
        ]
    },
    plugins: [
        new CleanWebpackPlugin([buildPath]),
        new AssetsPlugin({
            filename: "assets.json",
            path: buildPath,
            prettyPrint: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.ProvidePlugin({ "jQuery": "jquery" })
    ]
};
