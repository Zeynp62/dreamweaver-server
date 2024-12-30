const router = require('express').Router()
const PostController = require('../controllers/PostController')
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

const upload = multer({ storage: storage })
router.get('/', PostController.getAllPosts)
router.post('/addpost', upload.single('image'), PostController.createPost)
router.get('/:id', PostController.getPostByID)
router.put('/:id', PostController.updatePostByID)
router.delete('/:id', PostController.deletePostByID)

module.exports = router
