const express = require("express");
const router = express.Router();

// Note that the sequence is very important.
router.use("/", require("./web"));
router.use("/api/4", require("./api/4"));

module.exports = router;
