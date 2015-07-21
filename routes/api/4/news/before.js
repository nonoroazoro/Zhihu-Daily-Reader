var express = require("express");
var router = express.Router();

var crawler = require(__base + "/libs/zdr/crawler");

// get stroies of the specified date.
router.get("/:date?", function (req, res, next)
{
    if (req.params.date)
    {
        //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
        crawler.getStories(req.params.date, res);
    }
    else
    {
        p_res.status(404).render("error_404");
    }
});

module.exports = router;
