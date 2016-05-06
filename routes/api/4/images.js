const querystring = require("querystring");
const daily = require("../../../controllers/proxy/daily");

/**
 * get zhihu-daily image.
 */
module.exports.image = (req, res, next) =>
{
    daily.getImage(querystring.unescape(req.params.url), res, next);
};
