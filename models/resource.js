var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 存储知乎日报相关资源（例如：图片等）。
 */
var ResourceSchema = new Schema({
    /**
     * ID（唯一标识，例如图片原始 URL）。
     * @type {String}
     */
    id: String,
    
    /**
     * MIME。
     * @type {String}
     */
    contentType: String,
    
    /**
     * 内容。
     * @type {Buffer}
     */
    data: Buffer
});

ResourceSchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model("Resource", ResourceSchema);
