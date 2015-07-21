var querystring = require("querystring");
var express = require("express");
var router = express.Router();

var crawler = require(__base + "/libs/zdr/crawler");

// get zhihu daily image.
router.get("/:url", function (req, res, next)
{
    //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    crawler.getImage(querystring.unescape(req.params.url), res, next);
});

module.exports = router;
