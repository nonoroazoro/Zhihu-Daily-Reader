var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    id: { type: String },
    date: { type: String },
    read: { type: Boolean, default: false },
    content: { type: String },
});

StorySchema.index({ id: 1 }, { unique: true });
StorySchema.index({ date: 1 });
StorySchema.index({ read: 1 });

module.exports = mongoose.model("Story", StorySchema);
