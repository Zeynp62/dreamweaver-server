const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema(
  {
    taskName: { type: String, required: true },
    taskDate: { type: Date },
    taskState: { type: Boolean, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)
Task = mongoose.model('Task', tasksSchema)
module.exports = Task
