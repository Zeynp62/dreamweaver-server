const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('dotenv').config();

//in .env
const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
const APP_SECRET = process.env.APP_SECRET

// Hash password
const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  return hashedPassword; //turn the password to a hashed password
}

// Compare password
const comparePassword = async (password, storedPassword) => {
  const passwordMatch = await bcrypt.compare(password, storedPassword);
  return passwordMatch;
} 

//creating the token
const createToken = (payload) =>{
  let token = jwt.sign(payload,APP_SECRET) //generate the token
  return token
}//return the token

//this strip the token from the Bearer

module.exports = {
  hashPassword,
  comparePassword,
  createToken,

}
