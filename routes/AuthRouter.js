// routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/AuthController');

const router = express.Router();

// POST request to register a new user
router.post('/register', register);

// POST request to login a user
router.post('/login', login);

module.exports = router;
