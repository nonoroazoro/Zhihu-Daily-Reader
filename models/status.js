import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 存储知乎日报阅读器状态（单用户）。
 */
const StatusSchema = new Schema({
    /**
     * 用户名（唯一）。
     * @type {String}
     */
    username: String,
    
    /**
     * 已离线的日报时间范围（最新）。
     * @type {String}
     */
    startDate: String,
    
    /**
     * 已离线的日报时间范围（最旧）。
     * @type {String}
     */
    endDate: String
});

StatusSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("Status", StatusSchema);
