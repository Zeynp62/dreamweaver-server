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
    const passwordDigest = await middleware.hashPassword(password)

    // Create new user with profileImg (optional)
    const user = new User({
      username,
      email,
      passwordDigest,
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
  const { username, password } = req.body

  try {

    const user = await User.findOne({ username })
    
    if (!user) {
      return res.status(400).send({ msg: 'User not found' })
    }

    // check the password using comparePassword in middleware
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )

     // If they match, constructs a payload object of values we want on the front end
      if (matched) {
        let payload = {
          id: user._id,
          username: user.username
      }

      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }
    // if password not valid "considered the else to the if"
    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })


  } catch (err) {
    res.status(401).send({ status: 'Error', msg: 'An error has occurred while login!' })

  }
};

module.exports = {
  register,
  login,
};
