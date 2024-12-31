//connect to the models
const Category = require('./../models/category')
const Post = require('./../models/post')

//create new category
const createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.status(200).send(category)
  } catch (error) {
    res.status(400).send({ msq: 'Error Creating new category', error })
  }
}

//get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('posts')
    res.status(200).send(categories)
  } catch (error) {
    res.status(400).send({ msq: 'Error getting all categories' })
  }
}

//get categories by id
const getCategoryByID = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('posts')
    if (!category) {
      res.status(200).send({ msg: 'Error finding category by id' })
    }
    res.status(200).send(category)
  } catch (error) {
    res.status(400).send({ msg: 'Error getting category by id' })
  }
}

//updating category by id
const updateCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(category)
  } catch (error) {
    res.status(400).send({ msg: 'Error updating category' })
  }
}

//deleting the category by id
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id)
    res.status(200).send({ msg: 'Category was deleted successfully!' })
  } catch (error) {
    res.status(400).send({ msg: 'Error deleting category' })
  }
}

// module exports
module.exports = {
  createCategory,
  getCategoryByID,
  getAllCategories,
  updateCategory,
  deleteCategory
}
