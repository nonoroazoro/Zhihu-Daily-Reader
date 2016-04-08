const express = require("express");
const router = express.Router();
const daily = require("../../../../controllers/proxy/daily");

// get stroies of the specified date.
router.get("/:date?", (req, res, next) =>
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
