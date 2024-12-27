const mongoose = require('mongoose')

const postSchema = new Schema(
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
    user_id: { type: mongoose.Schema.Types.Number, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)
Post = mongoose.model('Post', postSchema)
module.exports = Post
