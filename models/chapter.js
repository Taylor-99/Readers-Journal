
const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    chaptername: {type: Number},
    readTitle: {type: String},
    readAuthor: {type: String},
    readImage: {type: String},
    readDescription: {type: String},
    comments: {type: Array},
    readingId: {type: mongoose.Types.ObjectId, ref: 'Reading'}
});

module.exports = mongoose.model("Chapter", chapterSchema);