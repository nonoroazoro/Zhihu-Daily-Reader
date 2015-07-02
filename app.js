var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var express = require("express");
var favicon = require("serve-favicon");
var path = require("path");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// favicon setup
app.use(favicon(path.join(__dirname, "public/assets/favicon.ico")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
{
    extended: false
}));
app.use(cookieParser());

// router setup
app.use("/", require("./routes"));

// static file setup
app.use("/assets", express.static(path.join(__dirname, "public/assets"),
{
    maxAge: 2592000000
}));
app.use(express.static(path.join(__dirname, "public"),
{
    maxAge: 2592000000
}));

// catch 404 and forward to error handler
app.use(function (req, res, next)
{
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// development error handler will print stacktrace
// production error handler no stacktraces leaked to user
if (app.get("env") === "development")
{
    app.use(function (err, req, res, next)
    {
        res.status(err.status || 500);
        res.render("error",
        {
            message: err.message,
            error: err
        });
    });
}
else
{
    app.use(function (err, req, res, next)
    {
        res.status(err.status || 500);
        res.render("error",
        {
            message: err.message,
            error:
            {}
        });
    });
}

module.exports = app;
