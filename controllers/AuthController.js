const bcrypt = require('bcrypt')
const User = require('../models/user')
const middleware = require('./../middleware')
// Registration Controller
const register = async (req, res) => {
  try {

    const { username, email, password, profileImg } = req.body
    
    // Check if the user already exists
    const existingUser = await User.findOne({ email })
    const existingUsername = await User.findOne({username}) 
    if (existingUser || existingUsername) {
      return res.status(400).send({ msg: 'User with this email or username already exists' })
    }

    // Hash password
    const hashedPassword = await middleware.hashPassword(password)

    // Create new user with profileImg (optional)
    const user = new User({
      username,
      email,
      passwordDigest: hashedPassword,
      profileImg: profileImg || '',  // Default to empty string if no image is provided
    })

    await user.save()

    // Send success response
    res.status(200).send({ msg: 'User registered successfully!', user })
  } catch (err) {
    res.status(500).send({ msg: 'Error during registration', error: err.message })
  }
}

// Login Controller
const login = async (req, res) => {
  const { email, username, password } = req.body

  try {
    //is the user valid => using email ///////////////////////////change/ or add to username if needed
    const user = await User.findOne({ email })
    
    if (!user) {
      return res.status(400).send({ msg: 'User not found' })
    }

    // is the password valid
    const isPasswordValid = await middleware.comparePassword(password, user.passwordDigest)
    if (!isPasswordValid) {
      return res.status(400).send({ msg: 'Invalid password' })
    }

    // 
    res.status(200).send({ msg: 'Login successful', user })
  } catch (err) {
    res.status(500).send({ msg: 'Error during login', error: err.message });
  }
};

module.exports = {
  register,
  login,
};

