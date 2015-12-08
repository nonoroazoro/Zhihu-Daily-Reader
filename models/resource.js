var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 存储知乎日报相关资源（例如：图片等）。
 */
var ResourceSchema = new Schema({
    /**
     * ID（url 的 MD5，唯一）。
     * @type {String}
     */
    id: { type: String },
    
    /**
     * 原始地址（特殊情况下调试用）。
     * @type {String}
     */
    url: { type: String },
    
    /**
     * MIME。
     * @type {String}
     */
    contentType: { type: String },
    
    /**
     * 内容。
     * @type {Buffer}
     */
    data: { type: Buffer }
});

ResourceSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model("Resource", ResourceSchema);
