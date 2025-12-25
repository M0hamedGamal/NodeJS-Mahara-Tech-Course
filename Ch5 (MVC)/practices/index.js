const express = require('express')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const app = express()
const carRoutes = require('./routes/cars.route')

// Middlewares
app.use(helmet())
app.use(cookieParser())
app.use(express.json())
app.use(express.static('public'))

app.use(carRoutes)

module.exports = app