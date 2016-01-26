import mongoose from "mongoose";

const Schema = mongoose.Schema;

/**
 * 存储知乎日报相关资源（例如：图片等）。
 */
const ResourceSchema = new Schema({
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

export default mongoose.model("Resource", ResourceSchema);
