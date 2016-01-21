var path = require("path");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, "./public/assets/zdr/");
var buildPath = path.resolve(srcPath, "./build/");

var isDev = (process.env.NODE_ENV !== "production");
if (isDev)
{
    var arg = process.argv[process.argv.length - 1];
    if (arg && arg.trim() === "-p")
    {
        isDev = false;
    }
}

var plugins = [
    new ExtractTextPlugin("[name].css"),
    //new webpack.optimize.CommonsChunkPlugin("vendors", "[name].js", Infinity),
    new webpack.optimize.OccurenceOrderPlugin(),
];

if (!isDev)
{
    plugins.push(new AssetsPlugin(
    {
        filename: "assets.json",
        path: buildPath,
        prettyPrint: true
    }));
}

module.exports = {
    devtool: isDev ? "inline-source-map" : null,
    entry:
    {
        zdr: srcPath,
        error: path.resolve(srcPath, "./common/error_404")
    },
    output:
    {
        path: isDev ? buildPath : path.join(buildPath, "/assets/[hash]/"),
        publicPath: "/assets/[hash]/",
        filename: "[name].js",
        chunkFilename: "[id].js",
    },
    resolve:
    {
        extensions: ["", ".js", ".jsx"]
    },
    externals:
    {
        "react": "React",
        "jquery": "jQuery",
        "lodash": "_",
        "moment": "moment",
        "mousetrap": "Mousetrap"
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
            }
        ]
    },
    plugins: plugins
};
