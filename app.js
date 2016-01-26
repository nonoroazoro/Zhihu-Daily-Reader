import path from "path";
import config from "config";
import express from "express";
import bodyParser from "body-parser";
import favicon from "serve-favicon";
import dbhelper from "./controllers/dbhelper";

// init db.
dbhelper.start(function ()
{
    dbhelper.connect(function (err)
    {
        if (err)
        {
            console.error("Database Server not started, some features will be shut down.");
        }
        else
        {
            if (config.crawler.enabled)
            {
                require("./controllers/crawler").start();
            }
        }
    });
});

// init express.
const app = express();

// base dir setup.
global.__base = __dirname;

// view engine setup.
app.set("views", __dirname + "/views/");
app.set("view engine", "jade");

// favicon setup.
app.use(favicon(__dirname + "/public/favicon.ico"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router setup.
app.use("/", require("./routes"));

// static file setup.
app.use(express.static(__dirname + "/public/", {
    maxAge: 2592000000
}));

// assets map setup.
app.locals.map = require("./public/assets/assets.json");

// catch 404 and forward to global error handler.
app.use((req, res, next) =>
{
    let err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

// global error handler.
app.use((err, req, res, next) =>
{
    res.status(err.status || 500).render("error_404", { map: app.locals.map });
});

export default app;
