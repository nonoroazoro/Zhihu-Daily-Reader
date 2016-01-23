var webpack = require("webpack");
var config = require("./webpack.base.config");

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