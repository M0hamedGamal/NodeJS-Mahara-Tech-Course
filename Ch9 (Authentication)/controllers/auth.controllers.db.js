const Auth = require('../models/auth.models.db')
const bcrypt = require('bcrypt')
const asyncFunction = require('../util/asyncFunction');

const registerController = asyncFunction(async (req, res, next) => {
        let authUser = await Auth.findOne({email: req.body.email})
        if (authUser) {
            return res.status(400).send('Email already exists')
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(req.body.password, salt)

        authUser = await new Auth({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
        })

        await authUser.save()

        const userToken = authUser.generateAuthToken()

        res.header('x-auth-token', userToken)

        res.status(201).json({
            data: authUser,
            message: 'Successfully registered'
        })
})

const loginController = asyncFunction(async (req, res, next) => {
    try {
        const authUser = await Auth.findOne({email: req.body.email})
        if (!authUser) {
            return res.status(400).send('Email or Password is incorrect')
        }

        const isPasswordValid = await bcrypt.compare(req.body.password, authUser.password)

        if (!isPasswordValid) {
            return res.status(400).send('Email or Password is incorrect')
        }

        const userToken = authUser.generateAuthToken()

        res.header('x-auth-token', userToken)

        res.status(200).send('Successfully logged in')
    } catch (e) {
        next(e)
    }
})

module.exports = {
    registerController,
    loginController
};