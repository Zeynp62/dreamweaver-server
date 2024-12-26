const mongoose = require('mongoose')

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    passwordDigest: { type: string, required: true },
    profileImg: { type: String }
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)
module.exports = User
