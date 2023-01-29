const express = require("express");
const router = express.Router();
const {
  getPirate,
  newPirate,
  updatePirate,
  deletePirate,
  getPirateById,
} = require("../controllers/pirateController");
const { protect } = require("../middleware/authMiddleware");

router.get("/getPirate/", protect, getPirate);

router.get("/getPirate/:_id", protect, getPirateById);

router.post("/newPirate", protect, newPirate);

router.put("/updatePirate/:_id", protect, updatePirate);

router.delete("/deletePirate/:_id", protect, deletePirate);

module.exports = router;
