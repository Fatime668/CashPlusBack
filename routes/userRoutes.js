const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for user registration
router.post('/register', userController.register);
router.post('/verify', userController.confirmCode);
router.post('/login', userController.login);

// Route for user verification

// Add more user routes as needed

module.exports = router;