import trim from "lodash/trim";

// 缓存日报内容。
const stories = {};

export default class DailyManager
{
    /**
     * 获取最新热门日报的 ID 列表。
     * @returns {Promise} `{date, ids}` or `null`
     */
    static getTopStoryIDs()
    {
        return fetch("/api/4/news/top").then((res) =>
        {
            return res.status === 200 ? res.json() : null;
        }).catch(() => null);
    }

    /**
     * 获取指定日期的日报的 ID 列表。
     *
     * @param {String} [p_date] 指定的日期。如果未指定，则返回最新日报的索引；如果小于 20130519，则返回 {}。
     * @returns {Promise} `{date, ids}` or `null`
     */
    static getStoryIDs(p_date)
    {
        return fetch(`/api/4/news/before/${trim(p_date)}`).then((res) =>
        {
            return res.status === 200 ? res.json() : null;
        }).catch(() => null);
    }

    /**
     * 获取指定唯一标识的日报。
     *
     * @param {String} p_id 指定的唯一标识。
     * @returns {Promise} `story` or `null`
     */
    static getStory(p_id)
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
                return fetch(`/api/4/news/${p_id}`).then((res) =>
                {
                    return res.status === 200 ? res.json() : null;
                }).then((story) =>
                {
                    stories[p_id] = story;
                    return story;
                }).catch(() => null);
            }
        }
        return Promise.resolve();
    }
}
