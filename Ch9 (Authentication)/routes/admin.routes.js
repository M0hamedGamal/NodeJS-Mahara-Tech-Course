const express = require('express');
const router = express.Router();
const {hasAdminRoleMiddleware} = require('../middlewares/admin.middlewares.db')
const {updateAdminRoleController} = require('../controllers/admin.controllers.db')

router.put('/updateAdminRole/:id', hasAdminRoleMiddleware, updateAdminRoleController)

module.exports = router