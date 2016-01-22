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
        names: "vendors",
        filename: "vendors.js",
        minChunks: Infinity
    }),
    new webpack.ProvidePlugin(
    {
        "$": "jquery",
        "jQuery": "jquery",
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
];

if (isDev)
{
    plugins.push(new webpack.SourceMapDevToolPlugin(
    {
        filename: "[file].map",
        exclude: ["vendors.js"],
        columns: false,
        module: false
    }));
}

module.exports = {
    entry:
    {
        zdr: srcPath,
        error: path.resolve(srcPath, "./common/error_404"),
        vendors: [
            "jquery",
            "react",
            "react-addons-update",
            "react-addons-pure-render-mixin",
            "bootstrap",
            "lodash",
            "moment",
            "mousetrap"
        ]
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
            }
        ]
    },
    plugins: plugins
};
