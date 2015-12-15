var config = require("config");
var express = require("express");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");

// init db.
var dbhelper = require("./controllers/dbhelper");
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
var app = express();

// base dir setup.
global.__base = __dirname;

// view engine setup.
app.set("views", __dirname + "/views");
app.set("view engine", "jade");

// favicon setup.
app.use(favicon(__dirname + "/public/assets/zdr/common/res/img/favicon.ico"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// router setup.
app.use("/", require("./routes"));

// static file setup.
if (app.get("env") === "development")
{
    app.use("/assets", express.static(__dirname + "/public/assets"));
}
else
{
    app.use("/assets", express.static(__dirname + "/public/assets", { maxAge: 2592000000 }));
}

// catch 404 and forward to global error handler.
app.use(function (req, res, next)
{
    var err = new Error("404 Not Found");
    err.status = 404;
    next(err);
});

// global error handler.
app.use(function (err, req, res, next)
{
    res.status(err.status || 500).render("error_404");
});

module.exports = app;
