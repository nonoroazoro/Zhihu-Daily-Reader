var config = require("config");
var moment = require("moment");
var cheerio = require("cheerio");
var querystring = require("querystring");

var options = { baseUrl : config.zhihu_daily_api };
var dailyRequest = require("request").defaults(options);
var imgRequest = require("request");
