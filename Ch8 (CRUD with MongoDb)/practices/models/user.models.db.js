// 1- Require mongoose
//    Require Schema
const mongoose = require('mongoose')
const {Schema} = mongoose

// 2- Create Schema
const userSchema = new Schema({
    id: {type: Number, required: true},
    name: {type: String, trim: true, required: true},
    age: {type: Number, required: true, min: 9, max: 100},
})

// 3- Create Model
const User = mongoose.model('users-collection', userSchema)

// 4- Export Model
module.exports = User