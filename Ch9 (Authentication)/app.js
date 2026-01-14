const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const userMiddleware = require('./middlewares/general.middlewares')
const errorMiddleware = require('./middlewares/error.middlewares')
const errorHandler = require('./util/errorHandler')
const userRoutes = require('./routes/user.routes')
const authRoutes = require('./routes/auth.routes')
const adminRoutes = require('./routes/admin.routes')
const app = express()

// Errors Handler
errorHandler()

// Middlewares
app.use(express.json())
app.use(helmet())
app.use(cors())
app.use('/users', userMiddleware.usersMiddleware)
app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/admin', adminRoutes)
app.use(errorMiddleware) // Receive an error from any catch error block [Express Error Middleware]


module.exports = app