var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index : "./index",
        error_404 : "./common/error_404"
    },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            common: path.resolve(__dirname, "common"),
            bootstrap: path.resolve(__dirname, "../libs/bootstrap")
        }
    },
    externals: {
        "react" : "React",
        "jquery" : "jQuery",
        "lodash": "_",
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "jsx?harmony" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            { test: /\.less$/, loader: ExtractTextPlugin.extract("style", "css!less") },
            { test: /\.(png|jpg)$/, loader: "url?limit=8192" },

            { test: /\.woff$/, loader: "url?limit=100000&mimetype=application/font-woff" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.css")
    ]
};