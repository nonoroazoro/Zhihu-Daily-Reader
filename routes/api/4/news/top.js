var express = require("express");
var router = express.Router();

var proxy = require(__base + "/controllers/proxy");

// get top stroies.
router.get("/", function (req, res, next)
{
    //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    proxy.getTopStoryIndexes(res);
});

module.exports = router;
