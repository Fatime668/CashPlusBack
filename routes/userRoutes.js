// const express = require('express');
// const router = express.Router();
// const userController = require('../controllers/userController');

// // Route for user registration
// router.post('/register', userController.register);
// router.post('/verify', userController.confirmCode);
// router.post('/login', userController.login);

// // Route for user verification

// // Add more user routes as needed

// module.exports = router;

const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const { validateUser } = require('../middlewares/validation');
const userController = require('../controllers/UserController');


router.post('/register', validateUser, userController.register);
router.post('/confirm', userController.confirmCode);
router.post('/login', userController.login);

module.exports = router;
