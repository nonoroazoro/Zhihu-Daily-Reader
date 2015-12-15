var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

// get top stroies.
router.get("/", function (req, res, next)
{
    daily.getTopStoryIDs(res, next);
});

module.exports = router;
