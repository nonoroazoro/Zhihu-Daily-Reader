"use strict";

const path = require("path");
const helmet = require("helmet");
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const compression = require("compression");

const log = require("./logs/bunyan");
const routes = require("./routes");
const session = require("./auth/session");
const passport = require("./auth/passport");
const assetsMap = require("../public/assets/assets.json");

// init express.
const app = express();

// view engine setup.
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "pug");

// logs.
app.use((req, res, next) =>
{
    req.log = log;
    next();
});

// security.
app.use(helmet());

// compression.
app.use(compression());

// favicon setup.
app.use(favicon(path.resolve(__dirname, "../public/favicon.ico")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// static file setup.
app.use(express.static(path.resolve(__dirname, "../public"), { maxAge: "1y" }));

// router setup.
app.use("/", routes);

// assets map setup.
app.locals.map = assetsMap;

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
    res.status(err.status || 500).render("error_404", { map: app.locals.map });
    req.log.error({ req });
});

module.exports = app;
