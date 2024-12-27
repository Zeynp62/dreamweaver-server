const router = require('express').Router()
const UserController = require("../controllers/UserController")

router.get('/', UserController.getAllUsers)
router.post('/', UserController.createUser)
router.get('/find', UserController.getUserByQuery)
router.get("/:id", UserController.getUserByID)
router.put('/:id', UserController.updateUserByID)
router.delete('/:id', UserController.deleteUserById); 
module.exports = router
