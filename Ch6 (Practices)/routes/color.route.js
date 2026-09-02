const express = require('express')
const router = express.Router()
const colorMiddleware = require('../middlewares/color.middleware')
const colorController = require('../controllers/color.controller')

// Middleware
router.param('id', colorMiddleware)

router.get('/', colorController.fetchColors)

router.get('/:id', colorController.fetchColorById)

router.post('/', colorController.createNewColor)

router.put('/:id', colorController.updateColor)

router.delete('/:id', colorController.deleteColor)

module.exports = router