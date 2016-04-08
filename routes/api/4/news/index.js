const express = require("express");
const router = express.Router();

const daily = require("../../../../controllers/proxy/daily");
const apis = [
    "/before",
    "/top",
];

apis.forEach((api) =>
{
    router.use(api, require("." + api));
});

// get specified story.
router.get("/:id", (req, res, next) =>
{
    daily.getStory(req.params.id, res, next);
});

module.exports = router;
