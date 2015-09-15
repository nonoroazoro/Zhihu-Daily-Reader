var moment = require("moment");
const FormatString = "YYYYMMDD";

/**
 * 转换指定的日期为知乎日报 API 所需格式。
 * @param Object p_date 指定的日期（允许 Date 和 String）。
 * @return String 返回计算结果，形如"20150726"；如果 p_date 是无效的日期，则返回 null。
 */
exports.convertToZhihuDate = function (p_date)
{
    try
    {
        var m = moment(p_date);
        return m.isValid() ? m.format(FormatString) : null;
    } catch (err)
    {
        return null;
    }
}

/**
 * 计算指定的知乎日期的后一天。
 * @param String p_date 形如"20150727"的日期字符串。
 * @return String 返回计算结果，形如"20150726"；如果 p_date 是无效的日期字符串，则将其原样返回。
 */
exports.nextZhihuDay = function (p_date)
{
    return this.subZhihuDate(p_date, -1);
}

/**
 * 计算指定的知乎日期的前一天。
 * @param String p_date 形如"20150727"的日期字符串。
 * @return String 返回计算结果，形如"20150726"；如果 p_date 是无效的日期字符串，则将其原样返回。
 */
exports.prevZhihuDay = function (p_date)
{
    return this.subZhihuDate(p_date);
}

/**
 * 知乎日期格式减去指定的天数。
 * @param String p_date 形如"20150727"的日期字符串。
 * @param Number p_day 要减去的天数，可以为负数（相当于增加天数）；如果不指定，则天数减1。
 * @return String 返回计算结果，形如"20150726"；如果 p_date 是无效的日期字符串，则将其原样返回。
 */
exports.subZhihuDate = function (p_date, p_day)
{
    var m = moment(p_date, FormatString, true);
    if (m.isValid())
    {
        return m.subtract(p_day || 1, "day").format(FormatString);
    }
    else
    {
        return p_date;
    }
}
