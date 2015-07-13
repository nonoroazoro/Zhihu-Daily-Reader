var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index : "./index",
        error_404 : "./common/error_404"
    },
    output: {
        path: __dirname,
        filename: "[name].bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            common: path.resolve(__dirname, "common")
        }
    },
    externals: {
        "react" : "React"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "jsx" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            { test: /\.(png|jpg)$/, loader: "url?limit=8192" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.css")
    ]
};