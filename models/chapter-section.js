
const mongoose = require('mongoose');

const chaptersectionSchema = mongoose.Schema({
    comments: {type: Array},
});

module.exports = mongoose.model("Chapter", chaptersectionSchema);