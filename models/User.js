// const { body } = require('express-validator');
// const { default: mongoose } = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   finCode: {
//     type: String,
//     required: true,
//     unique: true,
//     minlength: 7,
//     maxlength: 7,
//   },
//   serialNumber: {
//     type: String,
//     required: true,
//   },
//   password: {
//     type: String,
//     required: true,
//     minlength: 8,
//   },
//   verificationCode: {
//     type: String,
//   },
//   codeCounter: {
//     type: Number,
//     default: 3,
//   },
//   codeExpire: Date,
//   isActive: {
//     type: Boolean,
//     default: false,
//   },
// });

// const User = mongoose.model('User', userSchema);

// const validateUser = [
//   body('email')
//     .isEmail()
//     .withMessage('Invalid email')
//     .bail()
//     .custom(async (value) => {
//       const user = await User.findOne({ email: value });
//       if (user) {
//         throw new Error('Email is already registered');
//       }
//     }),

//   body('finCode')
//     .isLength({ min: 7, max: 7 })
//     .withMessage('finCode must be 7 characters long')
//     .bail()
//     .custom(async (value) => {
//       const user = await User.findOne({ finCode: value });
//       if (user) {
//         throw new Error('finCode is already registered');
//       }
//     }),

//   body('serialNumber').notEmpty().withMessage('serialNumber is required'),

//   body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
// ];

// module.exports = {
//   User,
//   validateUser,
// };

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  finCode: {
    type: String,
    required: true,
    unique: true,
    minlength: 7,
    maxlength: 7,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  verificationCode: {
    type: String,
  },
  codeCounter: {
    type: Number,
    default: 3,
  },
  codeExpire: Date,
  isActive: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
