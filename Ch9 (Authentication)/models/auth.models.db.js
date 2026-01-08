const mongoose = require('mongoose')
const {Schema} = mongoose
const valid = require('validator')
const jwt = require("jsonwebtoken");


const authSchema = new Schema({
    name: {type: String, required: true, trim: true, minlength: 3, maxlength: 50},
    password: {type: String, required: true, minlength: 5},
    email: {
        type: String, required: true, unique: true,
        validate: {
            validator: (value) => valid.isEmail(value),
            message: '{VALUE} is an invalid email address',
        }
    },
})


authSchema.methods.generateAuthToken = function () {
    return jwt.sign({
            userId: this._id,
        },
        process.env.SECRET,
        {
            expiresIn: '7d'
        })
}


const Auth = mongoose.model('auth-collections', authSchema)

module.exports = Auth