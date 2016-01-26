import { Router } from "express";
import querystring from "querystring";

const router = Router();
const daily = require(__base + "/controllers/proxy/daily");

// get zhihu-daily image.
router.get("/:url", (req, res, next) =>
{
    daily.getImage(querystring.unescape(req.params.url), res, next);
});

export default router;
