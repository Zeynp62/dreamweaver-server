// routes/authRoutes.js
const router = require('express').Router()
const controller = require('../controllers/AuthController')
const middleware = require('../middleware')

// POST request to register a new user
router.post('/register', controller.register)

// POST request to login a user
router.post('/login', controller.login)

router.put(
  '/update/:user_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CheckSession
)

module.exports = router
