const router = require('express').Router()
const TaskController = require('../controllers/TaskController')



router.get('/', TaskController.getAllTasks)
router.post('/', TaskController.createTask)
router.get('/:id', TaskController.getTaskByID)
router.delete('/:id', TaskController.deleteTaskByID)

module.exports = router