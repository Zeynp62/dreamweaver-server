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

    // Check the password using comparePassword in middleware
    let matched = await middleware.comparePassword(password, user.passwordDigest);

    if (matched) {
      let payload = {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      }

      let token = middleware.createToken(payload)
      return res.send({ user: payload, token })
    }

    res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (err) {
    res.status(401).send({ status: 'Error', msg: 'An error has occurred while login!' })
  }
};

const UpdatePassword = async (req, res) => {
  try {
    // Extracts the necessary fields from the request body
    const { oldPassword, newPassword } = req.body
    // Finds a user by a particular field (in this case, the user's id from the URL param)
    let user = await User.findById(req.params.user_id)
    // Checks if the password matches the stored digest
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    // If they match, hashes the new password, updates the db with the new digest, then sends the user as a response
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.user_id, {
        passwordDigest
      })
      let payload = {
        id: user.id,
        email: user.email
      }
      return res.status(200).send({ status: 'Password Updated!', user: payload })
    }
    res.status(401).send({ status: 'Error', msg: 'Old Password did not match!' })
  } catch (error) {
    console.log(error)
    res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred updating password!'
    })
  }
}

const CheckSession = async (req, res) => {
  const { payload } = res.locals // This contains the decoded JWT payload (user info)
  
  try {
    const user = await User.findById(payload.id)
      .populate('tasks') // Populate tasks with Task data
      .populate('posts') // Populate posts with Post data

    if (!user) {
      return res.status(404).send({ msg: 'User not found' })
    }

    res.status(200).send(user)
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Error fetching user session', error: err.message })
  }
};



module.exports = {
  register,
  login,
  UpdatePassword,
  CheckSession
}
