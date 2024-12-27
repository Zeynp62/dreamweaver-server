const { Post, User } = require('../models')

const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user')
    res.status(200).send(posts)
  } catch (error) {
    res.status(400).send({ msg: 'Error getting all posts', error })
  }
}

const createPost = async (req, res) => {
  try {
    const user = await User.findById(req.body.user)
    const post = await Post.create(req.body)
    user.posts.push(post._id)
    user.save()
    res.status(201).send(post)
  } catch (error) {
    res.status(400).send({ msg: 'Error creating a Post!', error: error })
  }
}

module.exports = {
  getAllPosts,
  createPost
}
