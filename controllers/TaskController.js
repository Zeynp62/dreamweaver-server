const Task = require('../models/tasks');
const User = require('../models/user');
const Category = require('../models/category');

// Create a new task
const createTask = async (req, res) => {
  try {
    const user = await User.findById(req.body.user);
    const task = await Task.create(req.body);
    user.tasks.push(task._id);
    await user.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send({ msg: 'Error creating the task!', error: error });
  }
};

// Get task by ID
const getTaskByID = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ msg: 'Error getting task by ID!', error: error });
  }
};

// Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (error) {
    res.status(400).send({ message: 'Error fetching tasks', error: error.message });
  }
};

// Update task by ID
const updateTaskByID = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(task);
  } catch (error) {
    res.status(400).send({ msg: 'Error updating task by ID!', error });
  }
};

// Delete task by ID
const deleteTaskByID = async (req, res) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    // If task doesn't exist
    if (!task) {
      return res.status(404).send({ msg: 'Task not found' });
    }

    // Remove task reference from the user who created it
    const user = await User.findById(task.user);
    if (user) {
      user.tasks = user.tasks.filter((taskId) => taskId.toString() !== task._id.toString());
      await user.save();
    }

    // Delete the task from the Task collection
    await Task.findByIdAndDelete(req.params.id);

    // Respond with success message
    res.status(200).send({ msg: 'Task deleted successfully', task });
  } catch (error) {
    res.status(400).send({ msg: 'Error deleting task by ID!', error });
  }
};

module.exports = {
  createTask,
  getTaskByID,
  getAllTasks,
  updateTaskByID,
  deleteTaskByID,
};

