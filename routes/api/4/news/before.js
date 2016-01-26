import { Router } from "express";

const router = Router();
const daily = require(__base + "/controllers/proxy/daily");

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

export default router;
