/**
 * 网站路由。
 */

const express = require("express");
const router = express.Router();
const site = require("./site");

// home page.
router.get("/", site.home);

module.exports = router;
