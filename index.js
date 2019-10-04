const express = require('express')
const app = express()
const passport = require('passport')
const router = require('./config/route')
const {mongoose} = require('./config/database')
const {User} = require('./app/Models/userModel')
const {usersRouter} = require('./app/Controllers/userController')
const cors = require('cors')

const path = require("path")
const port = process.env.PORT

app.use(cors())
app.use(passport.initialize())
require('./app/Middlewares/passport-local')
require('./app/Middlewares/passport-jwt')
app.use(express.json())
app.use('/', usersRouter)

// app.use(express.static(path.join(__dirname,"client/build")))

// app.get("*", (req,res) =>{
//     res.sendFile(path.join(__dirname + "/client/build/index.html"))
// })

app.listen(port, function(){
    console.log('Listening On Port', port)
})