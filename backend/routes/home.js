const express = require('express');
const { verifyToken } = require('../middleware/verification');
const router = express.Router();
const controller = require('../controllers/homeController');

router.get("/", verifyToken, controller.getHome);
router.get("/comment/:id", verifyToken, controller.getComments);

router.post("/like", verifyToken, controller.likePhoto);
router.post("/unlike", verifyToken, controller.unlikePhoto);
router.post("/comment", verifyToken, controller.addComment);

router.delete("/comment/:id", verifyToken, controller.deleteComment);

module.exports = router;