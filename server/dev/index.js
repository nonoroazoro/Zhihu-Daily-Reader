const { blue } = require("chalk");
const logger = require("morgan");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const devConfig = require("../../webpack.dev.config");

/**
 * inject dev settings to express app.
 */
module.exports.inject = (app, options = {}) =>
{
    console.log(blue("Current Environment: development"));

    // set logger.
    app.use(logger("dev"));

    // set webpack.
    const compiler = webpack(devConfig);
    const instance = webpackDevMiddleware(
        compiler,
        {
            stats:
            {
                chunks: false,
                colors: true
            },
            publicPath: devConfig.output.publicPath
        }
    );
    instance.waitUntilValid(() =>
    {
        // assets map setup.
        app.locals.map = require(options.assetsPath);
    });

    app.use(instance);
    app.use(webpackHotMiddleware(compiler));
};
