const router = require('express').Router()
const CategoryController = require("../controllers/CategoryController")

router.get('/', CategoryController.getAllCategories)
router.post('/',CategoryController.createCategory)

router.get('/:id', CategoryController.getCategoryByID)
router.put("/:id", CategoryController.updateCategory)
router.delete("/:id",CategoryController.deleteCategory)

module.exports = router
