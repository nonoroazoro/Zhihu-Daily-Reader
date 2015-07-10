var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    entry: "./index",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".css"]
    },
    externals: {
        "jquery" : "jQuery",
        "react" : "React"
    },
    module: {
        loaders: [
            { test: /\.jsx?$/, loader: "jsx" },
            { test: /\.css$/, loader: ExtractTextPlugin.extract("style", "css") },
            { test: /\.(png|jpg)$/, loader: "url?limit=8192" }
        ]
    },
    plugins: [
        new ExtractTextPlugin("bundle.css")
    ]
};