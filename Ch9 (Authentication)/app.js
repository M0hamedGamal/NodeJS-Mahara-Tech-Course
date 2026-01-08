const express = require('express')
const helmet = require('helmet')
const userMiddleware = require('./middlewares/general.middlewares')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const app = express()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use('/users', userMiddleware.usersMiddleware)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)

module.exports = app