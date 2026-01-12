const express = require('express')
const router = express.Router()
const {getUsersController,  getUserController, createUserController, updateUserController, deleteUserController} = require('../controllers/user.controllers.db')
const {userIdMiddleware, userValidatorMiddleware} = require('../middlewares/general.middlewares')
const {hasAdminRoleMiddleware} = require('../middlewares/admin.middlewares.db')

// Middlewares
router.param('id', userIdMiddleware)

// 2- Create Routers
router.get('/', getUsersController)

router.get('/:id', getUserController)

router.post('/', userValidatorMiddleware, hasAdminRoleMiddleware, createUserController)

router.put('/:id', userValidatorMiddleware, hasAdminRoleMiddleware, updateUserController)

router.delete('/:id', deleteUserController)

// 3- Exports Router
module.exports = router