const express = require("express");
const router = express.Router();
const {
  getTodo,
  newTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
} = require("../controllers/todoController");

router.get("/getTodo/", getTodo);

router.get("/getTodo/:_id", getTodoById);

router.post("/newTodo", newTodo);

router.put("/updateTodo/:_id", updateTodo);

router.delete("/deleteTodo/:_id", deleteTodo);

module.exports = router;
