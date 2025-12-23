const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middleware/verification") 
const controller = require("../controllers/createControllers")
const upload = require("../thirdParty/awss3")


router.get("/", verifyToken, controller.getCreate);

router.post("/photo", verifyToken, upload.single("file"), controller.postCreatePhoto);
router.post("/reel", verifyToken, upload.single("file"), controller.posCreateReel);

module.exports = router;