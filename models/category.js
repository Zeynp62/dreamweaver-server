const mongoose = require('mongoose')

const categorySchema = new Schema(
  {
    categoryName: { type: String, required: true }
  },
  {
    timestamps: true
  }
)

const Category = mongoose.model('Category', categorySchema)
module.exports = Category
