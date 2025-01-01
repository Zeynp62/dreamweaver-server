const router = require('express').Router()
const TaskController = require('../controllers/TaskController')
const middleware = require('../middleware')

router.get('/', TaskController.getAllTasks)
router.post(
  '/',
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
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.deleteTaskByID
)

router.get(
  '/user/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  TaskController.getTasksByUserId
);


module.exports = router
