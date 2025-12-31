// 1- Require mongoose
const mongoose = require('mongoose');
const { Schema } = mongoose;

// 2- Create Schema
const studentSchema = new Schema({
    id: {
      type: Number,
      required: true,
    },
    fn: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    ln: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    dept: {
        type: String,
        required: true,
        default: 'SD'
    }
})

// 3- Create Model
const Student = mongoose.model('students-collections', studentSchema);

module.exports = Student;