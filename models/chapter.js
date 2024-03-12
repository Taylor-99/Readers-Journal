
const mongoose = require('mongoose');

const chapterSchema = mongoose.Schema({
    chaptername: {type: Number},
    readingId: {type: mongoose.Types.ObjectId, ref: 'Reading'}
});

module.exports = mongoose.model("Chapter", chapterSchema);