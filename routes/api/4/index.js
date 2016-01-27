const express = require("express");
const router = express.Router();

const apis = [
    "/news",
    "/imgs",
];

apis.forEach((api) =>
{
    router.use(api, require("." + api));
});

module.exports = router;
