const asyncHandler = require("express-async-handler");
const ObjectIdVal = require("mongoose").Types.ObjectId;
const Todo = require("../models/todoModel");

// @desc    Get Todo
// @route   GET /api/todo/getTodo/
// @access  Public
const getTodo = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

// @desc    Get Todo by Id
// @route   GET /api/todo/getTodo/:id
// @access  Public
const getTodoById = asyncHandler(async (req, res) => {
  try {
    // console.log(`Entro: ${JSON.stringify(req.params._id)}`);
    const todos = await Todo.find({ user: req.params._id }, {});
    return res.status(200).send(todos);
  } catch (error) {
    return res.status(500).send({ message: "Error, try again" });
  }
});

// @desc    Create Todo
// @route   POST /api/todo/newTodo
// @access  Public
const newTodo = asyncHandler(async (req, res) => {
  const { user, task } = req.body;
  if (!task || task.length < 2 || !user) {
    return res.status(400).send({
      message: "Error, invalid inputs to create a new task",
    });
  }
  const todo = await Todo.create({
    task,
    user,
  });

  if (todo) {
    return res.status(201).json({
      success: true,
      _id: todo._id,
      task: todo.task,
      user: todo.user,
    });
  } else {
    return res
      .status(400)
      .send({ message: "Error creating the task, try again" });
  }
});

// @desc    Update Todo
// @route   PUT /api/todo/updateTodo/:id
// @access  Public
const updateTodo = asyncHandler(async (req, res) => {
  let id = req.params._id;
  if (!ObjectIdVal.isValid(id) && id !== undefined) {
    return res.status(404).send({ message: "Task not found" });
  }
  const todo = await Todo.findById(id);

  if (!todo || todo.length === 0) {
    return res
      .status(400)
      .send({ message: "Error, cant find a task with that id" });
  }

  const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, {
    new: true,
  });

  return res.status(200).json(updatedTodo);
});

// @desc    Delete Todo
// @route   DELETE /api/todo/deleteTodo/:id
// @access  Public
const deleteTodo = asyncHandler(async (req, res) => {
  let id = req.params._id;
  if (!ObjectIdVal.isValid(id) && id !== undefined) {
    return res.status(404).send({ message: "Task not found" });
  }
  const todo = await Todo.findById(id);

  if (!todo || todo.length === 0) {
    return res
      .status(400)
      .send({ message: "Error, cant find a Task with that id" });
  }

  await todo.remove();

  return res.status(200).json({
    success: true,
    id,
  });
});

module.exports = {
  getTodo,
  newTodo,
  updateTodo,
  deleteTodo,
  getTodoById,
};
