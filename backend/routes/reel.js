const express = require('express');
const { verifyToken } = require('../middleware/verification');
const router = express.Router();
const controller = require('../controllers/reelController');
const upload = require("../thirdParty/awss3");

router.get("/", verifyToken, controller.getReels);
router.get("/comment/:id", verifyToken, controller.getComments);

router.post("/likeReel", verifyToken, controller.likeReel);
router.post("/unlikeReel", verifyToken, controller.unlikeReel);
router.post("/comment", verifyToken, controller.addCommentReel);

router.delete("/comment/:id", verifyToken, controller.deleteCommentReel);


module.exports = router;