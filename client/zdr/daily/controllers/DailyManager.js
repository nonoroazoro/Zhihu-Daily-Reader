import $ from "jquery";
import trim from "lodash/trim";

// 缓存日报内容。
const stories = {};

/**
 * 获取最新热门日报的 ID 列表。
 * @returns {Promise} `{date, ids}` or `null`
 */
function getTopStoryIDs()
{
    return new Promise((p_resolve) =>
    {
        $.get("/api/4/news/top", p_resolve).fail(() => p_resolve(null));
    });
}

/**
 * 获取指定日期的日报的 ID 列表。
 *
 * @param {String} [p_date] 指定的日期。如果未指定，则返回最新日报的索引；如果小于 20130519，则返回 {}。
 * @returns {Promise} `{date, ids}` or `null`
 */
function getStoryIDs(p_date)
{
    return new Promise((p_resolve) =>
    {
        $.get(`/api/4/news/before/${trim(p_date)}`, p_resolve).fail(() => p_resolve(null));
    });
}

/**
 * 获取指定唯一标识的日报。
 *
 * @param {String} p_id 指定的唯一标识。
 * @returns {Promise} `story` or `null`
 */
function getStory(p_id)
{
    if (p_id)
    {
        const cache = stories[p_id];
        if (cache)
        {
            return Promise.resolve(cache);
        }
        else
        {
            return new Promise((p_resolve) =>
            {
                $.get(`/api/4/news/${p_id}`, (story) =>
                {
                    stories[p_id] = story;
                    p_resolve(story);
                }).fail(() => p_resolve(null));
            });
        }
    }
    return Promise.resolve();
}

export default {
    getTopStoryIDs,
    getStoryIDs,
    getStory
};
