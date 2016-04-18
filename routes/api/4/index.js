/**
 * API 路由。
 */

const express = require("express");
const router = express.Router();

const images = require("./images");
const stories = require("./stories");

// stories.
router.get("/news/top", stories.top);
router.get("/news/before/:date?", stories.before);
router.get("/news/:id", stories.story);

// images.
router.get("/imgs/:url", images.image);

module.exports = router;
