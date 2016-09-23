const config = require("./webpack.base.config");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool = "cheap-module-eval-source-map";

config.module.preLoaders = [
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint"
    }
];

config.plugins.push(new ExtractTextPlugin("res/[name].css"));

module.exports = config;
