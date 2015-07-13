var ExtractTextPlugin = require("extract-text-webpack-plugin");
var path = require("path");

module.exports = {
    entry: "./index",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            common: path.resolve(__dirname, "common")
        }
    },
    externals: {
        "jquery" : "jQuery",
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
        new ExtractTextPlugin("bundle.css")
    ]
};