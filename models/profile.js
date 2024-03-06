
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    usermane: {type: String},
    image: {type: String},
    bio: {type: String},
    interest: {type: Array},
    library: {type: Array},
    favorites: {type: Array},
});

module.exports = mongoose.model("UserProfile", profileSchema);