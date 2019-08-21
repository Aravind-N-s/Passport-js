const express = require('express')
const router = require('./config/route')
const {mongoose} = require('./config/database')
// const {usersRouter} = require('./app/Controllers/usersController')
const cors = require('cors')
const app = express()

const path = require("path")
const port = process.env.PORT || 3005

app.use(cors())
app.use(express.json())
app.use('/', router)


app.use(express.static(path.join(__dirname,"client/build")))

app.get("*", (req,res) =>{
    res.sendFile(path.join(__dirname + "/client/build/index.html"))
})

app.listen(port, function(){
    console.log('Listening On Port', port)
})