var express = require("express");
var router = express.Router();

// get article
router.get("/:id?", function (req, res, next)
{
    res.json(
    {
        id: req.params.id || "fucking no id",
        desc: "body of article",
        body: "<p>Mother fucker!</p>"
    });
});

module.exports = router;
