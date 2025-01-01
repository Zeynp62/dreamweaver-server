const Post = require('../models/post')
const User = require('../models/user')
const Category = require('../models/category')
var path = require('path')
const getAllPosts = async (req, res) => {
  //getting the post with the category
  try {
    const posts = await Post.find().populate('category')
    // const posts = await Post.find({})
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send({ msg: 'Error getting all posts', error })
  }
}

const createPost = async (req, res) => {
  try {
    const user = await User.findById(res.locals.payload.id)

    const category = await Category.findById(req.body.category)
    const post = await Post.create(req.body)

    user.posts.push(post._id)
    category.posts.push(post._id)
    user.save()
    category.save()
    res.status(201).send(post)
  } catch (error) {
    res.status(400).send({ msg: 'Error creating a Post', error: error })
  }
}

const updatePostByID = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })
    res.status(200).send(post)
  } catch (error) {
    res.status(400).send({ msg: 'Error updating post by ID', error })
  }
}

const deletePostByID = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (post) {
      await User.findByIdAndUpdate(post.user, {
        $pull: { posts: post._id }
      })
    }
    res.status(200).send({ msg: 'Post is successfully deleted!', post })
  } catch (error) {
    res.status(400).send({ msg: 'Error deleting a post', error })
  }
}

const getPostByID = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('category')
      .populate('user')
    res.status(200).send(post)
  } catch (error) {
    res.status(400).send({ msg: 'Error getting post by ID!', error: error })
  }
}
module.exports = {
  getAllPosts,
  createPost,
  updatePostByID,
  deletePostByID,
  getPostByID
}
