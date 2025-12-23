const User = require("../models/user")
const Photo = require("../models/photo")



const getProfile = async (req, res) => {
    const userId = req.user.id;

    const user = await User.findById(userId)

    const secureUserData = {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        photos: user.photos,
        reels: user.reels
    }

    res.status(200).json({ userInfo: secureUserData });
}


const updateProfilePhoto = async (req, res) => {
    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({message: "Invalid User ID"})
    }

    const user = await User.findById(userId)

    user.profilePhoto = req.file.location;
    await user.save()

    res.status(200).json({message:"Updated Successfully"})
}


const updateUsername = async (req, res) => {
    const userId = req.params.id
    const newUsername = req.body.username

    if (!newUsername) {
        return res.status(400).json({message: "Invalid Username"})
    }

    const user = await User.findById(userId)

    if (user.username === newUsername) {
        return res.status(401).json({message: "Don't Enter The Same Username"})
    }

    const users = await User.find()

    const existingUsernameUser = users.find( user => user.username === newUsername)

    if (existingUsernameUser) {
        return res.status(400).json({message: "Username Already Taken"})
    }

    user.username = newUsername
    await user.save()
    
    res.status(200).json({message : "Updated Successfully"})
}


const updateBio = async (req, res) => {
    const userId = req.params.id
    const newBio = req.body.bio
    
    if (!newBio) {
        return res.status(401).json({message: "Invalid Bio"})
    }

    if (newBio.length > 199) {
        return res.status(401).json({message: "Bio Must Be Less Than 200 Characters"})
    }

    const user = await User.findById(userId)

    user.bio = newBio
    await user.save()

    res.status(200).json({message: "Updated Successfully"})
}


const logOut = (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({message: "Log Out Successful"})
}


const deleteAccount = async (req, res) => {
    const userId = req.params.id

    if (!userId) {
        return res.status(400).json({message : "Unexpected Error Has Occured"})
    }

    const deletedUser = await User.findByIdAndDelete(userId)

    if (!deletedUser) {
        return res.status(400).json({message: "User Not Found"})
    }

    res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "lax"
    })

    res.status(200).json({message : "Account Deleted Successfully"})
}


const getPhotos = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await User.findById(userId)

    const neededUserInfo = {
        id: user._id,
        profilePhoto: user.profilePhoto,
        username: user.username
    }

    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    
    const userPhotosIds = user.photos || [];

    const photos = await Photo.find()

    const usersPhotos = photos.filter( photo => userPhotosIds.includes(photo._id) )
    const usersPhotosSorted = usersPhotos.sort( (a, b) => b.createdAt - a.createdAt )

    const usersPhotosFinished = [];

    usersPhotosSorted.map( (photo) => {
        let isLiked = photo.likes.includes(userId);

        const photoObj = {
            _id: photo._id,
            user: photo.user,
            photoSrc: photo.photoSrc,
            createdAt: photo.createdAt,
            likes: photo.likes,
            comments: photo.comments,
            isLiked: isLiked,
            caption: photo.caption
        }
        usersPhotosFinished.push(photoObj);
    });

    res.status(200).json({ photos: usersPhotosFinished, neededUserInfo: neededUserInfo });
}

module.exports = {
    getProfile,
    updateProfilePhoto,
    updateUsername,
    updateBio,
    logOut,
    deleteAccount,
    getPhotos
}