var express = require("express");
var router = express.Router();

var apis = [
    "/article"
];

apis.forEach(function (p_api)
{
    router.use(p_api, require("./" + p_api));
});

module.exports = router;