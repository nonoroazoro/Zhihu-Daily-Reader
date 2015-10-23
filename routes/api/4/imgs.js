var querystring = require("querystring");
var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

// get zhihu-daily image.
router.get("/:url", function (req, res, next)
{
    daily.getImage(querystring.unescape(req.params.url), res, next);
});

module.exports = router;
