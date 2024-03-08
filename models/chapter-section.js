
const mongoose = require('mongoose');

const chaptersectionSchema = mongoose.Schema({
    comments: {type: Array},
    readingId: {type: mongoose.Types.ObjectId, ref: 'Reading'}
});

module.exports = mongoose.model("Chapter", chaptersectionSchema);