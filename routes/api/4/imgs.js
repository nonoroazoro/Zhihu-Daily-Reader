var querystring = require("querystring");
var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

// get zhihu-daily image.
router.get("/:url", function (req, res, next)
{
    //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    daily.getImage(querystring.unescape(req.params.url), res);
});

module.exports = router;
