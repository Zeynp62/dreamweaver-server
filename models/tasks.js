const mongoose = require('mongoose')

const tasksSchema = new Schema(
  {
    task_id: { type: Number, required: true },
    taskName: { type: String, required: true },
    taskDate: { type: Date },
    taskState: { type: Boolean, required: true },
    category_id: { type: mongoose.Schema.Types.Number, ref: 'Category' },
    user_id: { type: mongoose.Schema.Types.Number, ref: 'User', required: true }
  },
  {
    timestamps: true
  }
)
Task = mongoose.model('Task', tasksSchema)
module.exports = Task
