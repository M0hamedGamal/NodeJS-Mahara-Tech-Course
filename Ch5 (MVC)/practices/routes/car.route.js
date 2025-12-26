const express = require('express')
const router = express.Router()
const carControllers = require('../controllers/car.controller')
const carMiddleware = require("../middlewares/car.middleware");

// Middleware
router.param('id', carMiddleware.carIdMiddleware)

// Routes
router.get('/cars', carControllers.fetchAllCars)

router.get('/cars/:id', carControllers.fetchCar)

router.post('/cars', carControllers.createCar)

router.put('/cars/:id', carControllers.updateCar)

router.delete('/cars/:id', carControllers.deleteCar)

module.exports = router