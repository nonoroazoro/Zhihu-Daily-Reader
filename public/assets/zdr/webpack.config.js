module.exports = {
    entry: "./index.jsx",
    output: {
        path: __dirname,
        filename: "bundle.js"
    },
    resolve: {
        extensions: ["", ".js", ".jsx"]
    },
    externals: {
        "jquery" : "jQuery",
        "react" : "React"
    },
    module: {
        loaders: [
            { test: /\.jsx$/, loader: "jsx" }
        ]
    }
};