const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
