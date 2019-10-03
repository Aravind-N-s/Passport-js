const express = require('express')
const router = express.Router()
const passport = require('passport')
const _ = require('lodash')
const { User } = require('../Models/userModel')

// const {authenticateUser} = require('../Middlewares/passport-setup')

//localhost:3005/users/register
router.post('/register', (req,res) => {
    const body = req.body
    const user = new User(body)
    user.save()
        .then(user => {res.json(user)})
        .catch(err =>{res.send(err)})
})

//localhost:3005/users/login
router.post('/login',passport.authenticate('local',{session:false}),(req,res) =>{
    res.json('what')
})

//localhost:3005/users/account
router.get('/account',passport.authenticate("local"), (req,res)=>{
    const {user} = req
    // res.send(user)
    res.send(_.pick(user, ['_id','username','Admin','password']))
})

//localhost:3005/users/logout
router.delete('/logout', (req,res) =>{
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){res.send(err)})
})
module.exports = {
    usersRouter: router
}