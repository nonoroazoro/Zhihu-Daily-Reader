const daily = require("../../../controllers/proxy/daily");

/**
 * get stroies of the specified date.
 */
module.exports.before = (req, res, next) =>
{
    // 如果未指定，则返回最新知乎日报 ID 列表。
    if (req.params.date)
    {
        daily.getStoryIDs(req.params.date, res, next);
    }
    else
    {
        daily.getLatestStoryIDs(res, next);
    }
};

/**
 * get specified story.
 */
module.exports.story = (req, res, next) =>
{
    daily.getStory(req.params.id, res, next);
};

/**
 * get top stroies.
 */
module.exports.top = (req, res, next) =>
{
    daily.getTopStoryIDs(res, next);
};