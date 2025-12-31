const validate = require('../utils/studentsValidation');
const Student = require('../models/studentModel');

const getAllStds = (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    console.log('Students page')

    Student.fetchAllStudents((students) => {
        res.json(students)
    })
}

const getStdById = (req, res) => {
    Student.fetchStudent(req.id, (student) => {
        if (!student)
            res.status(404).send('Not Found')

        res.json(student)
    })
}

const newStd = (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(403).send('There is a missing or invalid data')
        return
    }

    const student = new Student(req.body)
    console.log(student)
    student.saveStudent()

    res.json(student)
}

const updateStd = (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(403).send('There is a missing or invalid data')
        return
    }

    const id = req.id

    Student.updateStudent(id, req.body, (updatedStd) => {
        if (!updatedStd) {
            res.status(404).send(`This index ${id} is not found`)
            return
        }

        res.json(updatedStd)
    })
}

const deleteStd = (req, res) => {
    // Now the req has an id. Thnx for param middleware
    const id = req.id

    Student.deleteStudent(id, (deletedStd) => {
    if (!deletedStd) {
        res.status(404).send(`This index ${id} is not found`)
        return
    }

    res.json(deletedStd)
    })


}

module.exports = {
    getAllStds,
    getStdById,
    newStd,
    updateStd,
    deleteStd
}