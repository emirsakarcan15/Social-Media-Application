const mongoose = require('mongoose');

const User = mongoose.model("User", new mongoose.Schema({
    username: String,
    password: String,
    createdAt: { type: Date, default: Date.now },
    lastLogin: Date,
    photos: Array,
    reels: Array,
    profilePhoto: String,
    followers: Array,
    following: Array,
    bio: String
}))

module.exports = User;