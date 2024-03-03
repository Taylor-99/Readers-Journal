
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    user: {type: mongoose.Types.ObjectId, ref: 'User'},
    name: {type: String, required: true},
    image: {type: String},
    bio: {type: String},
    interest: {type: Array},
    favorites: {type: Array}
});

module.exports = mongoose.model("UserProfile", profileSchema);