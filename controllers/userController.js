// // userController.js

// const User = require('../models/User');
// const { sendVerificationCode } = require('../utils/emailService');
// var jwt = require('jsonwebtoken');
// var moment = require('moment')
// let privateKey = "lambofgod";


// const userController = {
//   register:async(req,res)=>{
//     const { email} = req.body;
//     User.findOne({email:req.body.email.toLowerCase()})
//     .then(data=>{
//       if (!data) {
//   // Generate a verification code
//   var verificationCode = Math.floor(1000 + Math.random() * 1000)
//   sendVerificationCode(email.toLowerCase(), verificationCode);

//         let newUser = User({
//           email:req.body.email,
//           finCode:req.body.finCode,
//           serialNumber:req.body.serialNumber,
//           password:req.body.password,
//           verificationCode: verificationCode
//         })
//       newUser.codeExpire = moment().add(120,'seconds')
//       newUser.save()
//       .then(saveRes=>{
//         res.json(saveRes)
//       }).catch(err=>{
//         res.status(500).json(err)
//       })

//     // Send the verification code to the user's email

//       }else{
//         res.json({ "msg": "User already exists!" })
//       }
//     })
//   },
//   confirmCode: (req, res) => {

      
//     User.findOne({ email: req.body.email.toLowerCase(),code:req.body.verificationCode})
//         .then(data => {
       
//             if (data) {

//                 if(data.verificationCode == req.body.verificationCode){
//                     if(data.codeCounter > 0 && moment(data.codeExpire) > moment()){
//                         data.codeCounter = 3;
//                         data.isActive = true;
//                         data.save();

//                         let token = jwt.sign(req.body.email,privateKey);
//                         res.json({token: token })
//                     }
//                     else{
//                         res.status(500).json({"message":"Code counter or code expire error!"})
//                     }
//                 }
//                 else{
//                     data.codeCounter = data.codeCounter - 1;
//                     data.save();
//                     res.status(500).json({"message":"Code wrong!"})
//                 }
//             }
//             else {
//                 res.status(500).json({ "msg": "Confirm Code error" })
//             }
//         })
//         .catch(err => {
//             console.log('Err', err);
//             res.status(500).send("Mongo error!")
//         })
// },
// login: (req, res) => {



//   User.findOne({ email: req.body.email?.toLowerCase(), password: req.body.password, isActive:true })
//       .then(data => {
//           if (data) {
     
//               var randomCode = Math.floor(Math.random() * 10000);
//               data.code = randomCode;
             

//               confirmCodeEmail(req.body.email, randomCode);
//               data.codeExpire = moment().add(20, 'seconds');
//               data.save();
//               res.json({ email: req.body.email })

//           }
//           else {
//               res.status(404).json({ "msg": "Email or password error" })
//           }
//       })

// },
// }

// module.exports = userController

const User = require('../models/User');
const { sendVerificationCode, confirmCodeEmail } = require('../utils/emailService');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userController = {
  register: async (req, res) => {
    const { email } = req.body;

    try {
      const existingUser = await User.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        return res.json({ msg: 'User already exists!' });
      }

      // Generate a verification code
      const verificationCode = Math.floor(1000 + Math.random() * 1000);
      sendVerificationCode(email.toLowerCase(), verificationCode);

      const newUser = new User({
        email: req.body.email,
        finCode: req.body.finCode,
        serialNumber: req.body.serialNumber,
        password: req.body.password,
        verificationCode: verificationCode,
        codeExpire: moment().add(120, 'seconds'),
      });

      await newUser.save();
      res.json(newUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  confirmCode: async (req, res) => {
    const { email, verificationCode } = req.body;

    try {
      const user = await User.findOne({ email: email.toLowerCase(), verificationCode: verificationCode });

      if (!user) {
        return res.status(500).json({ msg: 'Confirm Code error' });
      }

      if (user.verificationCode === verificationCode) {
        if (user.codeCounter > 0 && moment(user.codeExpire) > moment()) {
          user.codeCounter = 3;
          user.isActive = true;
          await user.save();

          const token = jwt.sign(email, privateKey);
          return res.json({ token: token });
        } else {
          return res.status(500).json({ message: 'Code counter or code expire error!' });
        }
      } else {
        user.codeCounter = user.codeCounter - 1;
        await user.save();
        return res.status(500).json({ message: 'Code wrong!' });
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email: email?.toLowerCase(), password: password, isActive: true });

      if (!user) {
        return res.status(404).json({ msg: 'Email or password error' });
      }

      const randomCode = Math.floor(Math.random() * 10000);
      user.code = randomCode;

      confirmCodeEmail(req.body.email, randomCode);
      user.codeExpire = moment().add(20, 'seconds');
      await user.save();

      res.json({ email: req.body.email });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong. Please try again.' });
    }
  },
};

module.exports = userController;



