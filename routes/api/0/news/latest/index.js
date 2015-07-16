var express = require("express");
var router = express.Router();
var crawler = require("../../../../../libs/zhr/crawler");

// get latest news
router.get("/", function (req, res, next)
{
    //crawler.getLatestNews(res.json);
    res.json(
        {
            id: "fucking no aaa",
            desc: "body of article",
            body: "<p>Mother fucker!</p>"
        });
});

module.exports = router;
