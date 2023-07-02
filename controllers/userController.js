// userController.js

const User = require('../models/User');
const { sendVerificationCode } = require('../utils/emailService');
var jwt = require('jsonwebtoken');
var moment = require('moment')
let privateKey = "lambofgod";


const userController = {
  register:async(req,res)=>{
    const { email} = req.body;
    User.findOne({email:req.body.email.toLowerCase()})
    .then(data=>{
      if (!data) {
  // Generate a verification code
  var verificationCode = Math.floor(1000 + Math.random() * 1000)
        let newUser = User({
          email:req.body.email,
          finCode:req.body.finCode,
          serialNumber:req.body.serialNumber,
          password:req.body.password,
          verificationCode: verificationCode
        })
      newUser.codeExpire = moment().add(60,'seconds')
      newUser.save()
      .then(saveRes=>{
        res.json(saveRes)
      }).catch(err=>{
        res.status(500).json(err)
      })

    // Send the verification code to the user's email
   sendVerificationCode(email, verificationCode);

      }else{
        res.json({ "msg": "User already exists!" })
      }
    })
  },
  confirmCode: (req, res) => {

      
    User.findOne({ email: req.body.email.toLowerCase()})
        .then(data => {
       
            if (data) {

                if(data.verificationCode == req.body.verificationCode){
                    if(data.codeCounter > 0 && moment(data.codeExpire) > moment()){
                        data.codeCounter = 3;
                        data.isActive = true;
                        data.save();

                        let token = jwt.sign(req.body.email,privateKey);
                        res.json({token: token })
                    }
                    else{
                        res.status(500).json({"message":"Code counter or code expire error!"})
                    }
                }
                else{
                    data.codeCounter = data.codeCounter - 1;
                    data.save();
                    res.status(500).json({"message":"Code wrong!"})
                }
            }
            else {
                res.status(500).json({ "msg": "Confirm Code error" })
            }
        })
        .catch(err => {
            console.log('Err', err);
            res.status(500).send("Mongo error!")
        })
},
login: (req, res) => {



  User.findOne({ email: req.body.email?.toLowerCase(), password: req.body.password, isActive:true })
      .then(data => {
          if (data) {
     
              var randomCode = Math.floor(Math.random() * 10000);
              data.code = randomCode;
             

              confirmCodeEmail(req.body.email, randomCode);
              data.codeExpire = moment().add(20, 'seconds');
              data.save();
              res.json({ email: req.body.email })

          }
          else {
              res.status(404).json({ "msg": "Email or password error" })
          }
      })

},
}

module.exports = userController