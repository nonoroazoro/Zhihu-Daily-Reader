var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    id: { type: String },
    date: { type: String },
    read: { type: Boolean, default: false },
    content: { type: String },
});

StorySchema.index({ id: 1 }, { unique: true });

module.exports = mongoose.model("Story", StorySchema);
