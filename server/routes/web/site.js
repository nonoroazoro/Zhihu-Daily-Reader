/**
 * 主页。
 */
module.exports.home = (req, res, next) =>
{
    res.render("index", { map: req.app.locals.map });
};
