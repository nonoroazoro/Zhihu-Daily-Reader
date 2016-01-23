var path = require("path");
var webpack = require("webpack");
var AssetsPlugin = require("assets-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

var srcPath = path.resolve(__dirname, "./client/zdr/");
var buildPath = path.resolve(__dirname, "./public/assets/");

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
    new AssetsPlugin(
    {
        filename: "assets.json",
        path: buildPath,
        prettyPrint: true
    }),
    new ExtractTextPlugin("res/[name].css"),
    new webpack.optimize.CommonsChunkPlugin(
    {
        name: "vendor",
        filename: "vendor.js",
        minChunks: Infinity
    }),
    new webpack.ProvidePlugin(
    {
        "jQuery": "jquery",
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
];

if (isDev)
{
    plugins.push(new webpack.SourceMapDevToolPlugin(
    {
        filename: "[file].map",
        exclude: ["vendor.js"],
        columns: false,
        module: false
    }));
}

module.exports = {
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
        zdr: srcPath,
        error: path.resolve(srcPath, "./common/error_404")
    },
    output:
    {
        path: isDev ? buildPath : path.join(buildPath, "/[hash:8]/"),
        publicPath: isDev ? "/assets/" : "/assets/[hash:8]/",
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
    plugins: plugins
};
