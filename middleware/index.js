const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//in .env
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS)
const APP_SECRET = process.env.APP_SECRET

// Hash password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS)
  return hashedPassword //turn the password to a hashed password
}

// Compare password
const comparePassword = async (password, storedPassword) => {
  const passwordMatch = await bcrypt.compare(password, storedPassword)
  return passwordMatch
}

//creating the token
const createToken = (payload) => {
  let token = jwt.sign(payload, APP_SECRET) //generate the token
  return token
} //return the token

//this strip the token from the Bearer
const stripToken = (req, res, next) => {
  try {
    // Extract token from the Authorization header (Bearer theToken)
    const token = req.headers['authorization']?.split(' ')[1] // Safe check with optional chaining

    if (token) {
      res.locals.token = token
      return next()
    }

    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    return res.status(401).send({ status: 'Error', msg: 'Strip Token Error!' })
  }
}

// verify the user token
const verifyToken = (req, res, next) => {
  const { token } = res.locals

  try {
    const payload = jwt.verify(token, APP_SECRET)

    if (payload) {
      res.locals.payload = payload
      return next()
    }

    return res.status(401).send({ status: 'Error', msg: 'Unauthorized' })
  } catch (error) {
    console.log(error)
    return res.status(401).send({ status: 'Error', msg: 'Verify Token Error!' })
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createToken,
  stripToken,
  verifyToken
}
