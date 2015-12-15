var express = require("express");
var router = express.Router();

// 下级 API 优先路由。
var apis = [
    "/api/4",
];

apis.forEach(function (p_api)
{
    router.use(p_api, require("." + p_api));
});

// home page.
router.get("/", function (req, res, next)
{
    res.render("index");
});

// api error handler.
router.use(function (err, req, res, next)
{
    res.status(404).send({
        status: 404,
        message: err.message
    });
});

module.exports = router;
