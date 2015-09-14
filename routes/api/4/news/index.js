var express = require("express");
var router = express.Router();

var proxy = require(__base + "/controllers/proxy");

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
    //TODO: 暂时先用这种方法，后面加上爬虫。读取本地缓存。
    proxy.getStory(req.params.id, res);
});

module.exports = router;
