const express = require('express');
const helmet = require('helmet'); 
const generalMiddleware = require('./middlewares/general.middleware');
const colorRouters = require('./routes/color.route');
const app = express()

// Middlewares
app.use(express.json())
app.use(helmet());
app.use(generalMiddleware)

app.use('/colors', colorRouters)

module.exports = app