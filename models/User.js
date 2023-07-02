const {default:mongoose} = require('mongoose')

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
        // match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
    },
    finCode:{
        type:String,
        required:true,
        unique:true,
        minlength: 7,
        maxlength: 7,
    },
    serialNumber:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
    },
    verificationCode: {
        type: String,
    },
    codeCounter: {
        type:Number,
        default:3
    },
    codeExpire: Date, //email e kod düştükten 20 saniye içerisinde kodu gir 
    isActive:{
        type:Boolean,
        default:false
    }
})
const User = mongoose.model('User',userSchema)

module.exports = User