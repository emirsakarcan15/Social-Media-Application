const User = require('../models/user');
const Photo = require('../models/photo');


const getHome = async (req, res) => {
    const photos = await Photo.find().sort({ createdAt: -1 }).limit(6);
    const userId = req.user.id;

    if (!photos) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    if (photos.length === 0) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const users = await User.find();
    
    if (!users) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    let neededData = [];

    let likedByCurrentUser = false;


    photos.map( (photo) => {
        users.map( (user) => {
            if (photo.user.toString() === user._id.toString()) {

                if (photo.likes.includes(userId)) {
                    likedByCurrentUser = true;
                } else {
                    likedByCurrentUser = false;
                }

                const photoData = {
                    photoSrc: photo.photoSrc,
                    createrPhoto: user.profilePhoto,
                    createrUsername: user.username,
                    photoId: photo._id,
                    caption: photo.caption,
                    likes: photo.likes,
                    comments: photo.comments,
                    likedByCurrentUser: likedByCurrentUser
                }
                neededData.push(photoData);
            }
        })
    })





    
    return res.status(200).json({ neededData: neededData});
}


const likePhoto = async (req, res) => {
    const userId = req.user.id;
    const photoId = req.body.photoId;

    const photo = await Photo.findById(photoId);

    if (!photo) {
        return res.status(400).json({ message: "Photo not found" });
    }
    
    if (photo.likes.includes(userId)) {
        return res.status(400).json({ message: "Photo already liked" });
    }

    photo.likes.push(userId);
    await photo.save();

    res.status(200).json({ message: "Photo liked successfully" });
}


const unlikePhoto = async (req, res) => {
    const userId = req.user.id;
    const photoId = req.body.photoId;

    const photo = await Photo.findById(photoId);
    
    if (!photo) {
        return res.status(400).json({ message: "Photo not found" });
    }

    if (!photo.likes.includes(userId)) {
        return res.status(400).json({ message: "Photo not liked yet" });
    }
    
    photo.likes = photo.likes.filter(id => id.toString() !== userId.toString());
    await photo.save();

    res.status(200).json({ message: "Photo unliked successfully" });
}



const getComments = async (req, res) => {
    const photoId = req.params.id;

    if (!photoId) {
        return res.status(400).json({ message: "Photo ID is required" });
    }

    const photo = await Photo.findById(photoId);
    
    if (!photo) {
        return res.status(400).json({ message: "Photo not found" });
    }

    const comments = photo.comments;

    res.status(200).json({ comments: comments });
}


const addComment = async (req, res) => {
    const photoId = req.body.photoId;
    const commentText = req.body.text;
    const activeUserId = req.user.id;

    if (!photoId || !commentText) {
        return res.status(400).json({ message: "Photo ID and comment text are required" });
    }

    const photo = await Photo.findById(photoId);
    const user = await User.findById(activeUserId);

    if (!user) {
        return res.status(400).json({ message: "User not found" });
    }
    
    if (!photo) {
        return res.status(400).json({ message: "Photo not found" });
    }

    const newComment = {
        commentText: commentText,
        userId: activeUserId,
        username: user.username,
        userProfilePhoto: user.profilePhoto
    }

    photo.comments.push(newComment);

    photo.comments = photo.comments.map( (obj, index) => ({
        ...obj,
        id: index + 1
    }))

    await photo.save();
    
    res.status(200).json({ message: "Comment added successfully" });
}


const deleteComment = async (req, res) => {
    const commentId = req.params.id;
    const photoId = req.body.photoId;

    if (!commentId || !photoId) {
        return res.status(400).json({ message: "Comment ID and Photo ID are required" });
    }

    const photo = await Photo.findById(photoId);
    
    if (!photo) {
        return res.status(400).json({ message: "Photo not found" });
    }

    if (photo.user.toString() !== req.user.id.toString()) {
        return res.status(403).json({ message: "Forbidden: You can only delete comments on your own photos" });
    }

    const commentToBeDeleted = photo.comments.find( comment => comment.id.toString() === commentId.toString() );
    
    if (!commentToBeDeleted) {
        return res.status(400).json({ message: "Comment not found" });
    }

    photo.comments = photo.comments.filter( comment => comment.id.toString() !== commentId.toString() );
    await photo.save();


    res.status(200).json({ message: "Comment deleted successfully" });
}



module.exports = {
    getHome,
    likePhoto,
    unlikePhoto,
    addComment,
    getComments,
    deleteComment
}