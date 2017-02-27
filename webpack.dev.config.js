const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const config = require("./webpack.base.config");

// config.devtool = "cheap-module-eval-source-map";

config.module.rules.push(
    {
        enforce: "pre",
        test: /\.jsx?$/,
        use: ["eslint-loader"],
        exclude: /node_modules/
    },
    {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
            use: ["css-loader"],
            fallback: "style-loader"
        })
    },
    {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
            use: ["css-loader", "less-loader"],
            fallback: "style-loader"
        })
    }
);

config.plugins.push(
    new ExtractTextPlugin({
        filename: "res/[name].css",
        allChunks: true
    }),
    new webpack.SourceMapDevToolPlugin({
        filename: "[file].map",
        exclude: ["vendor.js"]
    })
);

// HMR.
for (const key of Object.keys(config.entry))
{
    config.entry[key].unshift(
        "react-hot-loader/patch",
        "webpack-hot-middleware/client"
    );
}
config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
);

module.exports = config;
