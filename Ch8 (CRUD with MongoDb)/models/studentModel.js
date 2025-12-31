const fs = require('fs')
const path = require('path')

const studentsPath = path.join(__dirname, '../data/students.json')

class Student {
    constructor({name, dept}) {
        this.name = name
        this.dept = dept
    }

    static fetchAllStudents(callback) {
        fs.readFile(studentsPath, 'utf8', (err, data) => {
            if (err) return console.error(err)

            callback(JSON.parse(data))
        })
    }

    static fetchStudent(id, callback) {
        fs.readFile(studentsPath, 'utf8', (err, data) => {
            if (err) return console.error(err)

            const students = JSON.parse(data)

            const student = students.find(std => std.id === id)

            callback(student)
        })
    }

    saveStudent() {
        fs.readFile(studentsPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            let students = JSON.parse(data)

            this.id = students.length + 1
            students.push(this)

            fs.writeFile(studentsPath, JSON.stringify(students), (err) => {
                if (err) return console.log(err)
            })
        })
    }

    static updateStudent(id, updatedStudent, callback) {
        fs.readFile(studentsPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const students = JSON.parse(data)

            const idx = students.findIndex(std => std.id === id)

            if (idx === -1) {
                callback(undefined)
                return
            }

            for(let i in updatedStudent) {
                students[idx][i] = updatedStudent[i]
            }

            fs.writeFile(studentsPath, JSON.stringify(students), (err) => {
                if (err) return console.log(err)

                callback(students[idx])
            })
        })
    }

    static deleteStudent(id, callback) {
        fs.readFile(studentsPath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const students = JSON.parse(data)

            const idx = students.findIndex(std => std.id === id)

            if (idx === -1) {
                callback(undefined)
                return
            }

            const deletedStd = students.splice(idx, 1)[0]

            fs.writeFile(studentsPath, JSON.stringify(students), (err) => {
                if (err) return console.log(err)

                callback(deletedStd)
            })

        })
    }
}

module.exports = Student