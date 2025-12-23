const User = require("../models/user")
const Photo = require("../models/photo")


const getSearch = (req, res) => {
    res.status(200).json({message:"Search Page Loaded Successfully"})
}

const getUsers = async (req, res) => {
    const activeUserId = req.user.id

    if (!activeUserId) {
        return res.status(400).json({message:"Unexpected Error"})
    }
    
    const users = await User.find()

    if (!users) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    let secureUsers = []

    users.map((user) => {
        const secureUser = {
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

        secureUsers.push(secureUser)
    })

    res.status(200).json({userInfo: secureUsers, activeUserId: activeUserId})
}


const getSpesificUser = async (req, res) => {
    const searchedUserId = req.params.id
    const activeUserId = req.user.id
    let isFollowed = false

    if(!searchedUserId) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const user = await User.findById(searchedUserId)
    const photos = await Photo.find()

    if (!user) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    if (user.followers.includes(activeUserId)) {
        isFollowed = true
    }

    if (!photos) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const usersPhotos = photos.filter( photo => user.photos.includes(photo._id) )
    const usersPhotosSorted = usersPhotos.sort( (a, b) => b.createdAt - a.createdAt )

    const secureUserData = {
        id: user._id,
        username: user.username,
        createdAt: user.createdAt,
        profilePhoto: user.profilePhoto,
        bio: user.bio,
        followers: user.followers,
        following: user.following,
        photos: usersPhotosSorted,
        reels: user.reels
    }

    res.status(200).json({userInfo: secureUserData, isFollowed: isFollowed})
}


const followUser = async (req, res) => {
    const activeUserId = req.user.id
    const searchedUserId = req.params.id

    if (!activeUserId || !searchedUserId) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const activeUser = await User.findById(activeUserId)
    const searchedUser = await User.findById(searchedUserId)

    if (!activeUser || !searchedUser) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    activeUser.following.push(searchedUserId)
    searchedUser.followers.push(activeUserId)

    await activeUser.save()
    await searchedUser.save()

    res.status(200).json({message:"Followed Successfully"})
}


const unfollowUser = async (req, res) => {
    const activeUserId = req.user.id
    const searchedUserId = req.params.id

    if (!activeUserId || !searchedUserId) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const activeUser = await User.findById(activeUserId)
    const searchedUser = await User.findById(searchedUserId)

    if (!activeUser || !searchedUser) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    activeUser.following = activeUser.following.filter( id => id !== searchedUserId)
    searchedUser.followers = searchedUser.followers.filter( id => id !== activeUserId)

    await activeUser.save()
    await searchedUser.save()

    res.status(200).json({message:"Unfollowed Successfully"})
} 


const getPhotos = async (req, res) => {
    const searchedUserId = req.params.id

    if (!searchedUserId) {
        return res.status(400).json({message:"Unexpected Error"})
    }
    
    const user = await User.findById(searchedUserId)
    const photos = await Photo.find()

    if (!user) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    if (!photos) {
        return res.status(400).json({message:"Unexpected Error"})
    }

    const neededUserInfo = {
        id: user._id,
        profilePhoto: user.profilePhoto,
        username: user.username
    }

    if (!user) {
        return res.status(400).json({message:"Unexpected Error"})
    }
        
    const usersPhotos = photos.filter( photo => user.photos.includes(photo._id) )
    const usersPhotosSorted = usersPhotos.sort( (a, b) => b.createdAt - a.createdAt )

    res.status(200).json({photos: usersPhotosSorted, neededUserInfo: neededUserInfo})
}

module.exports = {
    getSearch,
    getUsers,
    getSpesificUser,
    followUser,
    unfollowUser,
    getPhotos
}