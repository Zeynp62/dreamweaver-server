const  Task  = require('../models/tasks')
const  User  = require('../models/user')
const  Category  = require('../models/category')




const createTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.user)
        if (!user) {
          return res.status(404).send({ msg: 'User not found' });
        }

        // Check if category exists (optional)
    if (req.body.category) {
      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(404).send({ msg: 'Category not found' });
      }
    }

        const task = await Task.create(req.body)
        console.log('Request body',req.body)
        user.tasks.push(task._id)
        await user.save()
        res.status(201).send(task)
      } catch (error) {
        res.status(400).send({ msg: 'Error creating the task!', error: error })
      }
    }

const getTaskByID = async (req, res) => {
        try {
          const task = await Task.findById(req.params.id).populate('category', 'name');
          if (!task) {
            return res.status(404).send({ msg: 'Task not found!' });
          }
          res.status(200).send(task)
        } catch (error) {
          res.status(400).send({ msg: 'Error getting task by ID!', error: error })
        }
      }


const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({}).populate('user', 'username') // Populate user details
      .populate('category', 'name'); // Populate category details
      res.status(200).send(tasks)
    } catch (error) {
      res.status(400).send({ message: 'Error fetching tasks', error: error.message })
    }
  }

  const updateTaskByID = async (req, res) => {
    try {
      if (req.body.category) {
        const category = await Category.findById(req.body.category);
        if (!category) {
          return res.status(404).send({ msg: 'Category not found!' });
        }
      }

      const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true
      })
      res.status(200).send(task)
    } catch (error) {
      res.status(400).send({ msg: 'Error updating task by ID!', error })
    }
  }

  const deleteTaskByID = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)

      if (!task) {
      return res.status(404).send({ msg: 'Task not found!' });
    }

      await User.findByIdAndUpdate(task.user, { $pull: { task: task._id } })
      res.status(200).send({ msg: 'Task successfully deleted!', task })
    } catch (error) {
      res.status(400).send({ msg: 'Error deleting a Task by ID!', error })
    }
  }

  const getTasksByUserId = async (req, res) => {
    try {
      const userId = req.params.id; // Get the user ID from the route parameter
      console.log('Fetching tasks for user ID:', userId); // Debugging log
  
      // Query tasks by user field
      const tasks = await Task.find({ user: userId });
  
      if (tasks.length === 0) {
        return res.status(404).send({ msg: 'No tasks found for this user.' });
      }
  
      res.status(200).send(tasks);
    } catch (error) {
      console.error('Error fetching tasks:', error);
      res.status(400).send({ msg: 'Error fetching tasks!', error });
    }
  };
  
  
  

  module.exports = {
    createTask,
    getTaskByID,
    getAllTasks,
    updateTaskByID,
    deleteTaskByID,
    getTasksByUserId
  }
