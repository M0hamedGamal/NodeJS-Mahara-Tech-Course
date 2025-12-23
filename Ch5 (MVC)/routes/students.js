const express = require("express");
const router = express.Router()
const studentsMiddlewares = require('../middlewares/studentsMiddleware');
const studentsController = require('../controllers/studentsController')

router.param('id', studentsMiddlewares.stdsIdMiddleware)

/**
 * Using '/' refers to '/students' because we add '/students' in app.js file
 * in app.use('/students', studentsRouter)
 * */
router.use('/', studentsMiddlewares.studentsMiddleware)

router.get('/', studentsController.getAllStds)


router.get('/:id', studentsController.getStdById)

router.post('/', studentsController.newStd)

router.put('/:id', studentsController.updateStd)

router.delete('/:id', studentsController.deleteStd)

module.exports = router