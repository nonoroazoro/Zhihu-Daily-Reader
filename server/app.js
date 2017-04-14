"use strict";

const path = require("path");
const helmet = require("helmet");
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const compression = require("compression");

const routes = require("./routes");
const log = require("./logs/bunyan");
const session = require("./auth/session");
const passport = require("./auth/passport");

const viewsPath = path.resolve(__dirname, "./views");
const faviconPath = path.join(viewsPath, "./res/favicon.ico");
const publicPath = path.resolve(__dirname, "../public");
const assetsPath = path.join(publicPath, "assets", "assets.json");

// init express.
const app = express();
const isDevMode = app.get("env") !== "production";

// view engine setup.
app.set("views", viewsPath);
app.set("view engine", "pug");

// inject logger.
app.use((req, res, next) =>
{
    req.log = log;
    next();
});

// gzip setup (force gzip).
app.use(compression({ threshold: 0 }));

// favicon setup.
app.use(favicon(faviconPath));

// body parser setup.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// security setup.
app.use(helmet());

// passport setup.
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// dev setup.
if (isDevMode)
{
    // development: logger & HMR setup.
    const { inject } = require("./dev/index");
    inject(app, { assetsPath });
}
else
{
    // production: assets map setup.
    app.locals.map = require(assetsPath);
}

// static file setup.
app.use(express.static(publicPath, { maxAge: "1y" }));

// router setup.
app.use("/", routes);

// catch 404 and forward to global error handler.
app.use((req, res, next) =>
{
    const err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

// global error handler.
app.use((err, req, res, next) =>
{
    // weird Windows shit.
    if (err.code !== "EPERM")
    {
        if (res.statusCode !== 304)
        {
            res.status(err.status || 500).render("error_404", { map: app.locals.map });
        }
        req.log.error({ req });
    }
});

module.exports = app;
