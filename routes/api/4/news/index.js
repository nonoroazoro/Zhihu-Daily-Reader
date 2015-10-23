var express = require("express");
var router = express.Router();

var daily = require(__base + "/controllers/proxy/daily");

var apis = [
    "/before",
    "/top",
];

apis.forEach(function (p_api)
{
    router.use(p_api, require("." + p_api));
});

// get specified story.
router.get("/:id", function (req, res, next)
{
    daily.getStory(req.params.id, res, next);
});

module.exports = router;
