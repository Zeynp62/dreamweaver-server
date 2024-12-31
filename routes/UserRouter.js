const router = require('express').Router()
const UserController = require('../controllers/UserController')
const multer = require('multer')
const middleware = require('../middleware')
path = require('path')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads') // Ensure "uploads" directory exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9)
    const extension = path.extname(file.originalname)
    cb(null, `${file.fieldname}-${uniqueSuffix}${extension}`)
  }
})

const upload = multer({ storage: storage })

router.get('/', UserController.getAllUsers)
router.post('/', UserController.createUser)
router.get('/find', UserController.getUserByQuery)

router.get('/:id', UserController.getUserByID)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  UserController.updateUserByID
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  UserController.deleteUserById
)

router.put(
  '/update-email/:id',
  middleware.stripToken,
  middleware.verifyToken,
  UserController.updateEmail
)
router.put(
  '/update-password/:id',
  middleware.stripToken,
  middleware.verifyToken,
  UserController.updatePassword
)
router.put(
  '/update-profile-image/:id',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('profileImg'),
  UserController.updateProfileImg
)

module.exports = router
