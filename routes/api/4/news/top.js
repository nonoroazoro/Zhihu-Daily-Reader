import { Router } from "express";

const router = Router();
const daily = require(__base + "/controllers/proxy/daily");

// get top stroies.
router.get("/", (req, res, next) =>
{
    daily.getTopStoryIDs(res, next);
});

export default router;
