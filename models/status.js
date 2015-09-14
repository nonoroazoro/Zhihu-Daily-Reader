var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 存储知乎日报阅读器状态（与用户相关）。
 */
var StatusSchema = new Schema({
    /**
     * 用户名（唯一）。
     * @type {String}
     */
    username: { type: String },
    
    /**
     * 存储的最新日报的日期。
     * @type {String}
     */
    newest: { type: String },
    
    /**
     * 存储的最旧日报的日期。
     * @type {String}
     */
    oldest: { type: String }
});

StatusSchema.index({ username: 1 }, { unique: true });

module.exports = mongoose.model("Status", StatusSchema);
