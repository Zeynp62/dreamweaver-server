const router = require('express').Router()
const PostController = require('../controllers/PostController')
const multer = require('multer')
const middleware = require('../middleware')

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

const upload = multer({ storage: storage })
router.get('/', PostController.getAllPosts)
router.post(
  '/posts',
  middleware.stripToken,
  middleware.verifyToken,
  upload.single('image'),
  PostController.createPost
)
router.get(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  PostController.getPostByID
)
router.put(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  PostController.updatePostByID
)
router.delete(
  '/:id',
  middleware.stripToken,
  middleware.verifyToken,
  PostController.deletePostByID
)

module.exports = router
