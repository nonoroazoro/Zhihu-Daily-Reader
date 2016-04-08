import _      from "lodash";
import moment from "moment";

const FormatString = "YYYYMMDD";

/**
 * 知乎日报的起始日期（早于该日期还没有日报呢）。
 */
export const MIN_DATE = moment("20130520", FormatString, true);

/**
 * 转换日期为知乎日期格式。
 * @param {String|Date} p_date 日期。
 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
 */
export function convertToZhihuDate(p_date)
{
    let m = null;
    if (_.isDate(p_date))
    {
        m = moment(p_date);
    }
    else if (_.isString(p_date))
    {
        m = this.convertZhihuDateToMoment(p_date);
        if (!m.isValid())
        {
            m = moment(new Date(p_date));
        }
    }
    
    if (m)
    {
        return m.isValid() ? m.format(FormatString) : null;
    }
    else
    {
        return null;
    }
}

/**
 * 转换知乎日期为 Moment 对象。
 * @param {String} p_date 形如"20150726"的日期字符串。
 * @return {Moment}
 */
export function convertZhihuDateToMoment(p_date)
{
    return moment(p_date, FormatString, true);
}

/**
 * 计算指定日期的后一天对应的知乎日期。
 * @param {String|Date} p_date 日期。
 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
 */
export function nextZhihuDay(p_date)
{
    return this.subZhihuDate(p_date, -1);
}

/**
 * 计算指定日期的前一天对应的知乎日期。
 * @param {Date|String} p_date 日期。
 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
 */
export function prevZhihuDay(p_date)
{
    return this.subZhihuDate(p_date);
}

/**
 * 计算指定日期减去指定天数后对应的知乎日期。
 * @param {Date|String} p_date 日期。
 * @param {Number} p_day 要减去的天数，可以为负数（相当于增加天数）；如果不指定，天数减1。
 * @return {String} 知乎日期格式字符串；如果 p_date 是无效的日期，返回 null。
 */
export function subZhihuDate(p_date, p_day)
{
    const m = this.convertZhihuDateToMoment(this.convertToZhihuDate(p_date));
    return m.isValid() ? m.subtract(p_day || 1, "day").format(FormatString) : null;
}

/**
 * 检查指定的日期是否符合知乎日期格式，即是否形如"20150726"。
 * @param {String} p_date 日期。
 * @return {Boolean}
 */
export function isValidZhihuDate(p_date)
{
    return this.convertZhihuDateToMoment(p_date).isValid();
}
