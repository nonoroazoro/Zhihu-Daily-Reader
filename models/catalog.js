var mongoose = require("mongoose");
var Schema = mongoose.Schema;

/**
 * 存储知乎日报的目录（以天为单位）。
 */
var CatalogSchema = new Schema({
    /**
     * 日期（知乎格式，例如："20130519"）。
     * @type {String}
     */
    date: String,
    
    /**
     * 知乎日报 ID 列表。
     * @type {Array}
     */
    ids: [Number],
    
    /**
     * 是否已全部离线。
     * @type {[String]}
     */
    cached: { type: Boolean, default: false }
});

CatalogSchema.index({ date: -1 }, { unique: true });

module.exports = mongoose.model("Catalog", CatalogSchema);
