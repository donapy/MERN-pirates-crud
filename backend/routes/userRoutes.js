const express = require("express");
const router = express.Router();
const {
  newUser,
  deleteUser,
  updateUser,
  getUser,
  getUserById,
  loginUser,
} = require("../controllers/userController");

const { protect } = require("../middleware/authMiddleware");

router.get("/getUser/", getUser);

router.get("/getUser/:_id", getUserById);

router.post("/newUser", newUser);

router.post("/loginUser", loginUser);

router.put("/updateUser/:_id", updateUser);

router.delete("/deleteUser/:_id", deleteUser);

module.exports = router;
