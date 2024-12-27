const mongoose = require('mongoose')

const postSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.Number,
      ref: 'Category',
      required: true
    },
    title: { type: String, required: true },
    description: {
      type: String,
      required: true
    },
    postImg: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)
Post = mongoose.model('Post', postSchema)
module.exports = Post
