const webpack = require("webpack");
const config = require("./webpack.base.config");

config.module.preLoaders =
[
    {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "eslint"
    }
];

config.plugins.push(
    new webpack.SourceMapDevToolPlugin(
    {
        filename: "[file].map",
        exclude: ["vendor.js"],
        columns: false,
        module: false
    })
);

module.exports = config;