const express = require("express");
const router = express.Router();

const daily = require("../../../../controllers/proxy/daily");

// get top stroies.
router.get("/", (req, res, next) =>
{
    daily.getTopStoryIDs(res, next);
});

module.exports = router;
