const mongoose = require('mongoose')

const dbConnection = () => {
    mongoose.connect('mongodb://localhost:27017/users')
        .then(() => {
            console.log('DB is connected...')
        })
        .catch((err) => {
            console.error(err)
        })
}

module.exports = dbConnection