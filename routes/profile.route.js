const express = require("express");
const {
  fetchUserData,
  deleteProfile,
  updateProfile,
} = require("../controllers/profile.controller.js");
const { uploadImage } = require("../middleware/uploadMiddleware.js");
const { verifyToken } = require("../middleware/auth.middleware.js");
const router = express.Router();

router.get("/profile", verifyToken, fetchUserData);

router.put(
  "/profile/:id",
  verifyToken,
  uploadImage.single("imagen"),
  updateProfile
);

router.delete("/profile/:id", verifyToken, deleteProfile);

module.exports = router;
