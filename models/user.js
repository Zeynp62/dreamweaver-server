const mongoose = require('mongoose')

const userSchema = new Schema(
  {
    user_id: { type: Number, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: string, required: true },
    profileImg: { type: String }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
