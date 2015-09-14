var express = require("express");
var router = express.Router();

var proxy = require(__base + "/controllers/proxy");

// get stroies of the specified date.
router.get("/:date?", function (req, res, next)
{
    if (req.params.date)
    {
        //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
        proxy.getStoryIndexes(req.params.date, res);
    }
    else
    {
        // 如果未指定，则返回最新日报的索引。
        proxy.getLatestStoryIndexes(res);
    }
});

module.exports = router;
