const express = require("express");
const router = express.Router();
const {
  purchase,
  allPurchases,
} = require("../controllers/purchase.controller");
const { verifyToken } = require("../middleware/auth.middleware.js");

router.get("/getAllPurchases/:id", verifyToken, allPurchases);
router.post("/purchase", verifyToken, purchase);

module.exports = router;
