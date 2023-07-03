const { body } = require('express-validator');
const User = require('../models/User');

const validateUser = [
  body('email')
    .isEmail()
    .withMessage('Invalid email')
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error('Email is already registered');
      }
    }),

  body('finCode')
    .isLength({ min: 7, max: 7 })
    .withMessage('finCode must be 7 characters long')
    .bail()
    .custom(async (value) => {
      const user = await User.findOne({ finCode: value });
      if (user) {
        throw new Error('finCode is already registered');
      }
    }),

  body('serialNumber').notEmpty().withMessage('serialNumber is required'),

  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
];

module.exports = {
  validateUser,
};
