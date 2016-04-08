const express = require("express");
const router = express.Router();
const querystring = require("querystring");

const daily = require("../../../controllers/proxy/daily");

// get zhihu-daily image.
router.get("/:url", (req, res, next) =>
{
    daily.getImage(querystring.unescape(req.params.url), res, next);
});

module.exports = router;
