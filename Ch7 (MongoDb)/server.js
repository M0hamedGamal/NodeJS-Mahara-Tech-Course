const mongoose = require("mongoose");
const {Schema} = mongoose;

mongoose.connect('mongodb://localhost:27017/students').then(() => {
    console.log('Database is connected successfully')
}).catch((err) => {
    console.log(err);
})


const studentSchema = new Schema({
    id: {type: Number, required: true, unique: true},
    fn: String,
    ln: String,
    dept: {type: String, required: true, enum: ['PD', 'SD', 'SA', 'MD', 'GD', 'EB', 'GA']},
})

const Student = mongoose.model('students-collections', studentSchema)

const getAllStudents = async () => {
    const students = await Student.find({}).and([{ln: 'Mahmoud'}])
    // console.log(students)
}

const addStudent = async (id, fn, ln, dept) => {
    try {

        const newStudent = await Student.create({
            id,
            fn,
            ln,
            dept
        })

        await getStudent(newStudent._id)
    } catch (e) {
        console.log(e)
    }
}

const getStudent = async (stdId) => {
    const student = await Student.findById(stdId)
    console.log(student)
}


getAllStudents()
addStudent(24, 'Maher', 'Zain', 'PD')