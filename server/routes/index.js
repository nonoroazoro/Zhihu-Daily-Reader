const config = require("config");
const express = require("express");
const router = express.Router();

// Note that the sequence of routes are very important.
if (config.enable_auth)
{
    router.use("/", require("./auth"));
}
router.use("/", require("./web"));
router.use("/api/4", require("./api/4"));

module.exports = router;
