const express = require("express")
const router = express.Router()
const controllers = require("../controllers/searchController")
const { verifyToken } = require("../middleware/verification")


router.get("/", verifyToken, controllers.getSearch)
router.get("/users", verifyToken, controllers.getUsers)
router.get("/users/:id", verifyToken, controllers.getSpesificUser)
router.get("/users/:id/photos", verifyToken, controllers.getPhotos)

router.post("/users/:id/follow", verifyToken, controllers.followUser)
router.post("/users/:id/unfollow", verifyToken, controllers.unfollowUser)

module.exports = router