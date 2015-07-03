var express = require("express");
var router = express.Router();

// home page
router.get("/", function (req, res, next)
{
    res.render("index",
    {
        title: "Express"
    });
});

router.use("/api/0", require("./api/0"));

module.exports = router;
