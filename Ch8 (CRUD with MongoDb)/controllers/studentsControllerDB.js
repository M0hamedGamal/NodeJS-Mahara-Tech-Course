const Student = require('../models/studentModelDB');

// Create Student
const addStudent = async (req, res) => {
    try {
        const {id, fn, ln, dept} = req.body

        const std = await new Student({
            id,
            fn,
            ln,
            dept
        })

        await std.save()
        res.status(200).json(std)
    } catch (error) {
        console.log(error)
        res.status(400).send('Bad Request')
    }
}

// Get Student By Id
const getStudent = async (req, res) => {
    const id = req.params.id

    const std = await Student.findById(id)

    if (!std)
        return res.status(404).send('Student not found')

    res.status(200).json(std)
}

// Get All Students
const getStudents = async (req, res) => {
    const stds = await Student.find().select({id:1, fn: 1, ln: 1}).sort({id: -1})

    res.json(stds)
}

// Update Student
const updateStudent = async (req, res) => {
    const id = req.params.id

    const updatedStd = await Student.findByIdAndUpdate(id, req.body, {
        new: true
    })

    if (!updatedStd)
        return res.status(404).send('Student not found')

    res.status(200).json(updatedStd)
}

// Delete Student
const deleteStudent = async (req, res) => {
    const id = req.params.id
    const deletedStd = Student.findByIdAndDelete(id)

    if (!deletedStd)
        return res.status(404).send('Student not found')

    res.status(200).json(deletedStd)
}

module.exports = {
    addStudent,
    getStudents,
    getStudent,
    updateStudent,
    deleteStudent,
}