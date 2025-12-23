const User = require('../models/user');
const Reel = require('../models/reel');


const getReels = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const reels = await Reel.find()
    const users = await User.find()

    if (!reels) {
        return res.status(401).json({ message: "Reels Not Found" });
    }

    let neededData = [];
    let likedByCurrentUser = false;

    reels.map( (reel) => {
        users.map( (user) => {
            if (reel.user.toString() === user._id.toString()) {
                
                if (reel.likes.includes(userId)) {
                    likedByCurrentUser = true;
                } else {
                    likedByCurrentUser = false;
                }

                const reelData = {
                    reelSrc: reel.reelSrc,
                    createrPhoto: user.profilePhoto,
                    createrUsername: user.username,
                    reelId: reel._id,
                    caption: reel.caption,
                    likes: reel.likes,
                    comments: reel.comments,
                    likedByCurrentUser: likedByCurrentUser,
                    createdAt: reel.createdAt
                }
                neededData.push(reelData);
            }
        })

    })

    res.status(200).json({ videos: neededData });
}


const likeReel = async (req, res) => {
    const userId = req.user.id;
    const { reelId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!reelId) {
        return res.status(400).json({ message: "Reel ID is required" });
    }
    
    const reel = await Reel.findById(reelId);

    if (!reel) {
        return res.status(400).json({ message: "Reel not found" });
    }

    if (reel.likes.includes(userId)) {
        return res.status(400).json({ message: "Reel already liked" });
    }

    reel.likes.push(userId);
    await reel.save();

    res.status(200).json({ message: "Like Reel" });
}


const unlikeReel = async (req, res) => {
    const userId = req.user.id;
    const { reelId } = req.body;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    if (!reelId) {
        return res.status(400).json({ message: "Reel ID is required" });
    }
    
    const reel = await Reel.findById(reelId);

    if (!reel) {
        return res.status(400).json({ message: "Reel not found" });
    }

    if (reel.likes.includes(userId) === false) {
        return res.status(400).json({ message: "Reel not liked yet" });
    }

    reel.likes = reel.likes.filter( (like) => like.toString() !== userId.toString() );
    await reel.save();

    res.status(200).json({ message: "Unlike Reel" });
}


const getComments = async (req, res) => {
    const reelId = req.params.id;

    if (!reelId) {
        return res.status(400).json({ message: "Reel ID is required" });
    }

    const reel = await Reel.findById(reelId);
    
    if (!reel) {
        return res.status(400).json({ message: "Reel not found" });
    }

    const comments = reel.comments;

    res.status(200).json({ comments: comments });
}


const addCommentReel = async (req, res) => {
    const reelId = req.body.reelId;
    const commentText = req.body.text;
    const activeUserId = req.user.id;

    if (!reelId || !commentText) {
        return res.status(400).json({ message: "Reel ID and comment text are required" });
    }

    const reel = await Reel.findById(reelId);
    const user = await User.findById(activeUserId);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    
    if (!reel) {
        return res.status(400).json({ message: "Reel not found" });
    }

    const newComment = {
        commentText: commentText,
        userId: activeUserId,
        username: user.username,
        userProfilePhoto: user.profilePhoto
    }

    reel.comments.push(newComment);

    reel.comments = reel.comments.map( (obj, index) => ({
        ...obj,
        id: index + 1
    }))

    await reel.save();

    res.status(200).json({ message: "Comment added successfully" });
}

const deleteCommentReel = async (req, res) => {
        const commentId = req.params.id;
        const reelId = req.body.reelId;
    
        if (!commentId || !reelId) {
            return res.status(400).json({ message: "Comment ID and Reel ID are required" });
        }
    
        const reel = await Reel.findById(reelId);
        
        if (!reel) {
            return res.status(400).json({ message: "Reel not found" });
        }
    
        if (reel.user.toString() !== req.user.id.toString()) {
            return res.status(403).json({ message: "Forbidden: You can only delete comments on your own reels" });
        }
    
        const commentToBeDeleted = reel.comments.find( comment => comment.id.toString() === commentId.toString() );
        
        if (!commentToBeDeleted) {
            return res.status(400).json({ message: "Comment not found" });
        }
    
        reel.comments = reel.comments.filter( comment => comment.id.toString() !== commentId.toString() );
        await reel.save();
    
    
        res.status(200).json({ message: "Comment deleted successfully" });
}




module.exports = {
    getReels,
    likeReel,
    unlikeReel,
    getComments,
    addCommentReel,
    deleteCommentReel
}