const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: String, required: true },
    profileImg: { type: String },
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }]
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
