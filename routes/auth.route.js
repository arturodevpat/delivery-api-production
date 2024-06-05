const express = require("express");
const loginLimiter = require("../middleware/rateLimiter.js");
const {
  registerUser,
  signUser,
  logout,
  refreshToken,
  registerUserValidationRules,
  signUserValidator,
} = require("../controllers/auth.controller");
const { uploadImage } = require("../middleware/uploadMiddleware.js");

const router = express.Router();

router.post(
  "/sign-up",
  uploadImage.single("imagen"),
  registerUserValidationRules(),
  registerUser
);

router.post("/sign-in", loginLimiter, signUserValidator(), signUser);

router.post("/logout", logout);

router.post("/refresh-token", refreshToken);
module.exports = router;
