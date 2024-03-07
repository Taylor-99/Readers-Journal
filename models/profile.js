
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String},
    image: {type: String},
    bio: {type: String},
    interest: {type: Array},
    library: {type: Array},
    favorites: {type: Array},
    user:{type: mongoose.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("UserProfile", profileSchema);