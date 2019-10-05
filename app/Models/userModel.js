const mongoose = require('mongoose')
const validator = require('validator')
const passport = require('passport')
const bcryptjs = require('bcryptjs')
const Schema = mongoose.Schema

const userSchema = new Schema ({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength: 5
    },
    email:{
        type: String,
        required: true,
        validate:{
            validator: function(value){
                return validator.isEmail(value)
            },
            message: function(){
                return 'Invalid Email Format'
            }
        }
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        maxlength: 128
    }
})

//pre hooks
userSchema.pre('save', function(next){
    const user = this
    if(user.isNew){
        bcryptjs.genSalt(10)
        .then(salt =>{
            console.log(salt)
            bcryptjs.hash(user.password, salt)
            .then(encrpytedPassword =>{
                console.log(encrpytedPassword)
                user.password = encrpytedPassword
                next()
            })
        })
    }else{next()}
})

const User = mongoose.model('User', userSchema)

module.exports = {
    User
}