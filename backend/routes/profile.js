const express = require('express');
const router = express.Router();
const { verifyToken } = require("../middleware/verification")
const controller = require("../controllers/profileController");
const upload = require("../thirdParty/awss3");

router.get("/", verifyToken, controller.getProfile);
router.get("/photos", verifyToken, controller.getPhotos);

router.post("/logout", controller.logOut);

router.patch("/photo/:id", upload.single("file"), controller.updateProfilePhoto);
router.patch("/username/:id", controller.updateUsername);
router.patch("/bio/:id", controller.updateBio);

router.delete("/delete/:id", controller.deleteAccount);


module.exports = router;