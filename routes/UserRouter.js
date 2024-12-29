const router = require('express').Router()
const UserController = require("../controllers/UserController")
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = file.originalname.split('.').pop()
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
  }
})

router.get('/', UserController.getAllUsers)
router.post('/', UserController.createUser)
router.get('/find', UserController.getUserByQuery)
router.get("/:id", UserController.getUserByID)
router.put('/:id', UserController.updateUserByID)
router.delete('/:id', UserController.deleteUserById); 
module.exports = router
