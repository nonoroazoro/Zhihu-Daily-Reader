const path = require("path");
const config = require("config");
const express = require("express");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");

const routes = require("./routes");
const crawler = require("./controllers/crawler");
const dbhelper = require("./controllers/dbhelper");
const assetsMap = require("./public/assets/assets.json");

// init db.
dbhelper.start(() =>
{
    dbhelper.connect((err) =>
    {
        if (err)
        {
            console.error("Database Server not started, some features will be shut down.");
        }
        else
        {
            if (config.crawler.enabled)
            {
                crawler.start();
            }
        }
    });
});

// init express.
const app = express();

// view engine setup.
app.set("views", __dirname + "/views/");
app.set("view engine", "jade");

// favicon setup.
app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router setup.
app.use("/", routes);

// static file setup.
app.use(express.static(__dirname + "/public/", {
    maxAge: 2592000000
}));

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
