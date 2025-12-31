const express = require("express");
const router = express.Router()
const studentsMiddlewares = require('../middlewares/studentsMiddleware');
const studentsController = require('../controllers/studentsControllerDB')

router.param('id', studentsMiddlewares.stdsIdMiddleware)

/**
 * Using '/' refers to '/students' because we add '/students' in app.js file
 * in app.use('/students', studentsRouter)
 * */
router.use('/', studentsMiddlewares.studentsMiddleware)

router.get('/', studentsController.getStudents)


router.get('/:id', studentsController.getStudent)

router.post('/', studentsController.addStudent)

router.put('/:id', studentsController.updateStudent)

router.delete('/:id', studentsController.deleteStudent)

module.exports = router