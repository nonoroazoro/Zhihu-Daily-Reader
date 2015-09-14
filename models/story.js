var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 存储知乎日报内容。
 */
var StorySchema = new Schema({
    /**
     * Id。
     * @type {String}
     */
    id: { type: String },
    
    /**
     * 日期。
     * @type {String}
     */
    date: { type: String },
    
    /**
     * 已读状态。
     * @type {Boolean}
     */
    read: { type: Boolean, default: false },
    
    /**
     * 离线日报内容。
     * @type {String}
     */
    content: { type: String },
});

StorySchema.index({ id: 1 }, { unique: true });
StorySchema.index({ date: -1 });

module.exports = mongoose.model("Story", StorySchema);
