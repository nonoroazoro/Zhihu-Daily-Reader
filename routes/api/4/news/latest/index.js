var express = require("express");
var router = express.Router();
var crawler = require("../../../../../libs/zhr/crawler");

// get latest news
router.get("/", function (req, res, next)
{
    // 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    crawler.getLatestNews(res);
});

module.exports = router;
