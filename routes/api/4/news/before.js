var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

// get stroies of the specified date.
router.get("/:date?", function (req, res, next)
{
    // 如果未指定，则返回最新知乎日报 ID 列表。
    if (req.params.date)
    {
        daily.getStoryIDs(req.params.date, res, next);
    }
    else
    {
        daily.getLatestStoryIDs(res, next);
    }
});

module.exports = router;
