
const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {types:String},
    chapter_section: {type: Array, required: true},
    tags: {type: Array},
    image: {type: String},
    review: {type: Number, min: 0, max: 5},
    comment: {type: String},
    favorite: {type: Boolean, default: false}
});

module.exports = mongoose.model('Reading', readingSchema);