const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const middleware = require('../middleware')

router.get('/', TaskController.getAllTasks)
router.post(
  '/task',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.createTask
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.getTaskByID
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.updateTaskByID
)
router.delete(
  '/task/:id',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.deleteTaskByID
)

module.exports = router
