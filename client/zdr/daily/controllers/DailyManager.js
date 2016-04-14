import $          from "jquery";
import trim       from "lodash/string/trim";
import isEmpty    from "lodash/lang/isEmpty";
import isFunction from "lodash/lang/isFunction";

const _stories = {};

export default class DailyManager
{
    /**
     * 获取目前已从服务端获取到的所有日报内容的缓存（以日报 id 进行检索，无序，请勿用 index 检索）。
     */
    static getFetchedStories()
    {
        return _stories;
    }

    /**
     * 获取最新热门日报的 ID 列表。
     * @param {Function(err, res)} [p_callback]
     */
    static getTopStoryIDs(p_callback)
    {
        return $.get("/api/4/news/top", (p_data) =>
        {
            p_callback(null, p_data);
        }).fail(() =>
        {
            p_callback("/api/4/news/top error");
        });
    }

    /**
     * 获取指定日期的日报的 ID 列表。
     * @param String p_date 指定的日期。如果未指定，则返回最新日报的索引；如果小于 20130519，则返回 {}。
     * @param {Function(err, res)} [p_callback]
     */
    static getStoryIDs(p_date, p_callback)
    {
        if (isFunction(p_date))
        {
            p_callback = p_date;
            p_date = null;
        }
    
        if (isEmpty(trim(p_date)))
        {
            return $.get("/api/4/news/before", (p_data) =>
            {
                p_callback(null, p_data);
            }).fail(() =>
            {
                p_callback("/api/4/news/before error");
            });
        }
        else
        {
            return $.get("/api/4/news/before/" + p_date, (p_data) =>
            {
                p_callback(null, p_data);
            }).fail(() =>
            {
                p_callback("/api/4/news/before/" + p_date + " error");
            });
        }
    }

    /**
     * 获取指定唯一标识的日报。
     * @param String p_id 指定的唯一标识。
     * @param {Function(err, res)} [p_callback]
     */
    static getStory(p_id, p_callback)
    {
        if (isFunction(p_callback))
        {
            if (isEmpty(trim(p_id)))
            {
                if (isFunction(p_callback))
                {
                    p_callback("p_id must not be null");
                }
            }
            else
            {
                return $.get("/api/4/news/" + p_id, (p_data) =>
                {
                    _stories[p_id] = p_data;
                    p_callback(null, p_data);
                }).fail(() =>
                {
                    p_callback("/api/4/news/ error");
                });
            }
        }
    }
}
