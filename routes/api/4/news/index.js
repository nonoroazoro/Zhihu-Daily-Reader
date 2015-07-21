var express = require("express");
var router = express.Router();

var apis = [
    "/before",
    "/latest",
    "/top",
];

apis.forEach(function (p_api)
{
    router.use(p_api, require("." + p_api));
});

// get specified story.
router.get("/:id", function (req, res, next)
{
    // TODO: 获取指定 id 的日报。
    res.send(
        {
            haha: "这是你妹:" + req.params.id
        }
    );
});

module.exports = router;
