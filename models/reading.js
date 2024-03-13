
const mongoose = require('mongoose');

const readingSchema = new mongoose.Schema({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String},
    chapters: {type: Array, required: true},
    tags: {type: Array},
    image: {type: String, default: 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg'},
    rating: {type: Number, min: 0, max: 5, default: 0},
    review: {type: String},
    favorite: {type: Boolean, default: false},
    user: {type: mongoose.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Reading', readingSchema);