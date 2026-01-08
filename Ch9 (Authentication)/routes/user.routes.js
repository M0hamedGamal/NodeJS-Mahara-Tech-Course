const express = require('express')
const router = express.Router()
const usersController = require('../controllers/user.controllers.db')
const userMiddleware = require('../middlewares/general.middlewares')

// Middlewares
router.param('id', userMiddleware.userIdMiddleware)

// 2- Create Routers
router.get('/', usersController.getUsersController)

router.get('/:id', usersController.getUserController)

router.post('/', userMiddleware.userValidatorMiddleware, usersController.createUserController)

router.put('/:id', userMiddleware.userValidatorMiddleware, usersController.updateUserController)

router.delete('/:id', usersController.deleteUserController)

// 3- Exports Router
module.exports = router