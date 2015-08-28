var path = require("path");
var srcPath = path.resolve(__dirname, "./public/assets/zdr");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: {
        index: path.resolve(srcPath, "./index"),
        error_404: path.resolve(srcPath, "./common/error_404")
    },
    output: {
        path: path.resolve(srcPath, "./build"),
        filename: "[name].bundle.js",
        chunkFilename: "[id].bundle.js",
    },
    resolve: {
        extensions: ["", ".js", ".jsx"],
        alias: {
            common: path.resolve(srcPath, "./common"),
            bootstrap: path.resolve(srcPath, "../libs/bootstrap")
        }
    },
    externals: {
        "react": "React",
        "jquery": "jQuery",
        "lodash": "_",
        "moment": "moment"
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: "jsx?harmony"
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract("style", "css")
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract("style", "css!less")
            },
            {
                test: /\.(png|jpg)$/,
                loader: "url?limit=8192"
            },
            {
                test: /\.woff$/,
                loader: "url?limit=100000&mimetype=application/font-woff"
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("[name].bundle.css")
    ]
};
