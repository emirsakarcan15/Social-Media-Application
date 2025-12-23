const mongoose = require('mongoose');

const Reel = mongoose.model("Reel", new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    createdAt: { type: Date, default: Date.now },
    reelSrc: String,
    likes: Array,
    comments: Array,
    caption: String
}))


module.exports = Reel