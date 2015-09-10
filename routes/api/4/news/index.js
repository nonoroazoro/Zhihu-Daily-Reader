var express = require("express");
var router = express.Router();

var crawler = require(__base + "/controllers/crawler");

var apis = [
    "/before",
    "/top",
];

apis.forEach(function (p_api)
{
    router.use(p_api, require("." + p_api));
});

// get specified story.
router.get("/:id", function (req, res, next)
{
    //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    crawler.getStory(req.params.id, res);
});

module.exports = router;
