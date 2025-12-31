const mongoose = require('mongoose')
const {Schema} = mongoose

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost/students')
        console.log('Connected...')
    } catch (e) {
        console.error(e)
    }
}

connectDB()

const studentSchema = new Schema({
    id: Number,
    fn: String,
    ln: String,
    dept: String,
})

const Student = mongoose.model('students-collections', studentSchema)

const getAllStudents = async () => {
    const students = await Student.find()
    console.log(students)
}

const addStudent = async () => {
    const newStudent = new Student({
        id: 25,
        fn: 'Mohamed',
        ln: 'Gamal',
        dept: 'PD'
    })

    // Student.create(data);
    // is equivalent to
    // const newStudent = new Student(data);
    // await newStudent.save();
    await newStudent.save()

}

const getStudent = async () => {
    const student = await Student.find().where('id').gt(10)
    console.log(student)
}

const updateStudent = async () => {
    const updatedStudent = await Student.findById('6953bec305fd460caefd6ea8')

    updatedStudent.dept = 'MD'

    await updatedStudent.save()

    console.log(updatedStudent)
}

const deletedStudent = async () => {
    const deletedStudent = await Student.deleteOne({_id: '69551693f45d857fbaaf64d3'})
    console.log(deletedStudent)
}

// getAllStudents()
// addStudent()
// getStudent()
// updateStudent()
deletedStudent()
