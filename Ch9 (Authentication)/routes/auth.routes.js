const express = require('express')
const router = express.Router()
const {registerValidatorMiddleware, loginValidatorMiddleware} = require('../middlewares/auth.middlewares.db')
const {registerController, loginController} = require('../controllers/auth.controllers.db')

router.post('/register', registerValidatorMiddleware, registerController)

router.post('/login', loginValidatorMiddleware, loginController)







module.exports = router