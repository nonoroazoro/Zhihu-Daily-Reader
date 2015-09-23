var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

// get stroies of the specified date.
router.get("/:date?", function (req, res, next)
{
    if (req.params.date)
    {
        //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
        daily.getStoryIDs(req.params.date, res);
    }
    else
    {
        // 如果未指定，则返回最新日报的 ID 列表。
        daily.getLatestStoryIDs(res);
    }
});

module.exports = router;
