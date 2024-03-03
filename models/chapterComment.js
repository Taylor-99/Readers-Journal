
const mongoose = require('mongoose');

const chapterCommentSchema = new mongoose.Schema({
    comment: {type: String},
    dateCreated: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", chapterCommentSchema);