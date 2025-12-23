const User = require("../models/user")
const Photo = require("../models/photo")
const Reel = require("../models/reel")




const getCreate = (req, res) => {
    res.status(200).json({message:"Create Page Loaded Successfully"})
}


const postCreatePhoto = async (req, res) => {
    const caption = req.body.caption
    const activeUserId = req.user.id

    if (!caption) {
        return res.status(401).json({message:"Please Provide A Valid Caption"})
    }

    if (caption.length > 199) {
        return res.status(401).json({message:"Caption Must Be Less Than 200 Characters"})
    }

    if (!activeUserId) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    if (!req.file || !req.file.location) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    const newPhoto = {
        user: activeUserId,
        photoSrc: req.file.location,
        createdAt: Date.now(),
        likes: [],
        comments: [],
        caption: caption
    }


    const photo = await Photo.create(newPhoto)
    
    if (!photo) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    const user = await User.findById(activeUserId)

    if (!user) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    user.photos.push(photo._id)
    await user.save()

    res.status(200).json({message:"Photo Uploaded Successfully"})
}


const posCreateReel = async (req, res) => {
    const caption = req.body.caption
    const activeUserId = req.user.id

    if (!caption) {
        return res.status(401).json({message:"Please Provide A Valid Caption"})
    }

    if (caption.length > 199) {
        return res.status(401).json({message:"Caption Must Be Less Than 200 Characters"})
    }

    if (!activeUserId) {
        return res.status(500).json({message:"Something Went Wrong"})
    }


    const newReel = {
        user: activeUserId,
        reelSrc: req.file.location,
        createdAt: Date.now(),
        likes: [],
        comments: [],
        caption: caption
    }


    const reel = await Reel.create(newReel)
    
    if (!reel) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    const user = await User.findById(activeUserId)

    if (!user) {
        return res.status(500).json({message:"Something Went Wrong"})
    }

    user.reels.push(reel._id)
    await user.save()

    res.status(200).json({message:"Reel Uploaded Successfully"})
}


module.exports = {
    getCreate,
    postCreatePhoto,
    posCreateReel
}