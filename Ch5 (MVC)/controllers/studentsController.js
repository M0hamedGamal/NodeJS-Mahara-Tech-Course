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
    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
    const student = students.find(std => std.id === id)

    if (!student)
        res.send('Not Found')

    res.json(student)
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

    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
    const idx = students.findIndex(std => std.id === id)

    if (idx === -1) {
        res.status(404).send(`This index ${id} is not found`)
        return
    }

    for (let i in req.body) {
        students[idx][i] = req.body[i]
    }

    const student = students[idx]

    res.json(student)
}

const deleteStd = (req, res) => {
    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
    const idx = students.findIndex(std => std.id === id)

    if (idx === -1) {
        res.status(404)
        res.send(`This index ${id} is not found`)
        return
    }

    const deletedStd = students.splice(idx, 1)[0]

    res.json(deletedStd)
}

module.exports = {
    getAllStds,
    getStdById,
    newStd,
    updateStd,
    deleteStd
}