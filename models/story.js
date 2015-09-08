var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var StorySchema = new Schema({
    content: { type: String },
    id: { type: String },
    date: { type: Date },
    read: { type: Boolean, default: false },
});

module.exports = mongoose.model("Story", StorySchema);
