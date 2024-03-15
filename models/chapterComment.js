
const mongoose = require('mongoose');

const chapterCommentSchema = new mongoose.Schema({
    comment: {type: String},
    dateCreated: {type: String},
    chapterId: {type: mongoose.Types.ObjectId, ref: 'Chapter'}
});

module.exports = mongoose.model("Comment", chapterCommentSchema);