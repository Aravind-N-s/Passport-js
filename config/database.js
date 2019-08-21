const mongoose = require('mongoose')
mongoose.Promise = global.Promise
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)

//connect to db
const CONNECTION_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/passport'
mongoose.connect(CONNECTION_URI, { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to the DB')
    })
    .catch((err) => {
        console.log('ERROR connected to DB')
    })

module.exports = {
    mongoose
}
