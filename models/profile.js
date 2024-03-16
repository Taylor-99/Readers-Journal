
const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String},
    image: {type: String, default: "https://sirinc2.org/branch129/wp-content/uploads/2019/04/no-photo-icon-22.png"},
    bio: {type: String},
    interest: {type: Array},
    user:{type: mongoose.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model("UserProfile", profileSchema);