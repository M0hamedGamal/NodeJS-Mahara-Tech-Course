const fs = require('fs')
const path = require('path')

const studentsPath = path.join(__dirname, '../data/students.json')

module.exports = class Student {
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
}