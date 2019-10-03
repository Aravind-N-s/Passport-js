const passport = require('passport')
const {User} = require('../Models/userModel')
const bcryptjs = require('bcryptjs')
const options ={
    usernameField: 'email',
    passwordField: 'password'
}

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(options,function(email, password, done) {
    User.findOne({email})
    .then(user =>{
        if(!user){
            return Promise.reject({errors:'Invalid E-mail/Password'})
        }
        bcryptjs.compare(password, user.password)
        .then(result => {
            if (result) {return done(null, user)}
            done()
        })
        .catch(err => {return Promise.reject(err)})
    })
}))
