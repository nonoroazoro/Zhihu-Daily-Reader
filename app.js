"use strict";

const path = require("path");
const config = require("config");
const helmet = require("helmet");
const express = require("express");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const compression = require("compression");

const routes = require("./routes");
const session = require("./auth/session");
const passport = require("./auth/passport");
const crawler = require("./controllers/crawler");
const dbhelper = require("./controllers/dbhelper");
const assetsMap = require("./public/assets/assets.json");

// init db.
dbhelper.connect((err) =>
{
    if (err)
    {
        dbhelper.start((err) =>
        {
            let msg = "\nDatabase Server not started, some features will be shut down.";
            if (err)
            {
                console.error(msg + "\n" + err.message);
            }
            else
            {
                dbhelper.connect((err) =>
                {
                    if (err)
                    {
                        console.error(msg + "\n" + err.message);
                    }
                    else
                    {
                        if (config.crawler.enabled)
                        {
                            setTimeout(crawler.start, config.crawler.delay);
                        }
                    }
                });
            }
        });
    }
    else
    {
        if (config.crawler.enabled)
        {
            setTimeout(crawler.start, config.crawler.delay);
        }
    }
});

// init express.
const app = express();

// view engine setup.
app.set("views", path.resolve(__dirname, "./views"));
app.set("view engine", "jade");

// security.
app.use(helmet());

// compression.
app.use(compression());

// favicon setup.
app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session);
app.use(passport.initialize());
app.use(passport.session());

// static file setup.
app.use(express.static(path.resolve(__dirname, "./public")));

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
});

module.exports = app;
