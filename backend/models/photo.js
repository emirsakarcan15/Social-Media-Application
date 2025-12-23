const mongoose = require('mongoose');

const Photo = mongoose.model("Photo", new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    photoSrc: String,
    createdAt: { type: Date, default: Date.now },
    likes: Array,
    comments: Array,
    caption: String
}))


module.exports = Photo