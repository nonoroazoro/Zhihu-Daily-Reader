const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * 存储知乎日报列表（以天为单位）。
 */
const CatalogSchema = new Schema({
    /**
     * 日期（知乎格式，例如："20130519"）。
     * @type {String}
     */
    date: String,

    /**
     * 知乎日报 ID 列表。
     * @type {Array}
     */
    ids: [Number]
});

CatalogSchema.index({ date: -1 }, { unique: true });

module.exports = mongoose.model("Catalog", CatalogSchema);
