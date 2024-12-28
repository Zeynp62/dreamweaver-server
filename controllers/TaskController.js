const { Task , User } = require('../models')


const createTask = async (req, res) => {
    try {
        const user = await User.findById(req.body.user)
        const task = await Task.create(req.body)
        user.tasks.push(task._id)
        user.save()
        res.status(201).send(task)
      } catch (error) {
        res.status(400).send({ msg: 'Error creating the task!', error: error })
      }
    }

const getTaskByID = async (req, res) => {
        try {
          const task = await Task.findById(req.params.id)
          res.status(200).send(task)
        } catch (error) {
          res.status(400).send({ msg: 'Error getting task by ID!', error: error })
        }
      }


const getAllTasks = async (req, res) => {
    try {
      const tasks = await Task.find({})
      res.status(200).send(tasks)
    } catch (error) {
      res.status(400).send({ message: 'Error fetching tasks', error: error.message })
    }
  }

  const deleteTaskByID = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id)
      await User.findByIdAndUpdate(recipe.user, { $pull: { recipes: recipe._id } })
      res.status(200).send({ msg: 'Task successfully deleted!', recipe })
    } catch (error) {
      res.status(400).send({ msg: 'Error deleting a Task by ID!', error })
    }
  }

  module.exports = {
    createTask,
    getTaskByID,
    getAllTasks,
    deleteTaskByID
  }
