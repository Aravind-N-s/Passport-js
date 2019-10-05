require('dotenv').config()
const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const { User } = require('../Models/userModel')

router.post('/register', async (req,res) => {
    try{
        const body = req.body
        const user = new User(body)
        const user1 = await user.save()
        res.json(user1)
    }catch(err){
        res.json(err)
    }
    
})

router.post('/login',passport.authenticate('local',{session:false}),(req,res) =>{
    const user = req.user
    console.log(user)
    if(user !== 'error'){
        const tokenData = {
            _id:user._id,
            username: user.username,
            createdAt: Number(new Date())
        }
        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET)
        res.json({token})
    }
    else{
        res.json('Invalid Email and Password')
    }  
    
})

router.get('/account',passport.authenticate('jwt',{session:false}), (req,res)=>{
    const {user} = req
    // res.json(user)
    // res.json(_.pick(user, ['_id','username','password']))
    res.render('index',{title: 'Express'})
})

router.delete('/logout', async (req,res) =>{
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
        .then(function(){
            res.send({notice:'successfully logged out'})
        })
        .catch(function(err){res.send(err)})
        // try{
        //     const newUser = await User.findByIdAndUpdate(user._id,{$pull: {tokens: { token: token }}})
        //     if(newUser){
        //         res.status(200).json({notice:'successfully logged out'})
        //     }
        // }catch(err){
        //     res.send(err)
        // }
})
module.exports = {
    usersRouter: router
}