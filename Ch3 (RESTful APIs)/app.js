const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 8080
const Ajv = require('ajv')

const students = [
    {id: 1, name: 'Mohamed', dept: 'SD'},
    {id: 2, name: 'Gamal', dept: 'SD'},
    {id: 3, name: 'Ali', dept: 'MD'},
    {id: 4, name: 'Badr', dept: 'SA'},
]

const schema = {
    type: 'object',
    properties: {
        name: {
            type: 'string',
            pattern: '^[A-Z][a-z]*$'
        },
        dept: {
            type: 'string',
            enum: ['SD', 'MD', 'SA'],
            maxLength: 2,
            minLength: 2
        },
    },
    required: ['name', 'dept'],
    maxProperties: 2,
    minProperties: 2,
}

const ajv = new Ajv()
const validate = ajv.compile(schema)

// Middlewares
app.use(express.json()) // for JSON bodies
app.use(express.urlencoded({extended: true})) // for Form data

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Get All Students
app.get('/students', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    console.log('Students page')
    res.json(students)
})

// Get Student by Id
// Using Params [:id]
app.get('/students/:id', (req, res) => {
    const id = req.params.id
    const student = students.find(std => std.id == id)

    if (!student)
        res.send('Not Found')

    res.json(student)
})

// Using Query Strings [?fnm=Mohamed&lnm=Gamal]
app.get('/welcome.html', (req, res) => {
    const query = req.query
    const fName = req.query.fnm
    const lName = req.query.lnm
    console.log(query, fName, lName)

    res.sendFile(path.join(__dirname, 'public/welcome.html'))
})

app.post('/welcome.html', (req, res) => {
    console.log(req.body)
    const {fnm: fName, lnm: lName} = req.body

    res.send(`<h1>Hello ${fName} ${lName}.👋</h1>`)
})

// Create a new Student
app.post('/students', (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(403).send('There is a missing or invalid data')
        return
    }

    req.body.id = students.length + 1

    students.push(req.body)

    res.json(students)
})

// Delete a Student
app.delete('/students/:id', (req, res) => {
    const id = req.params.id
    const idx = students.findIndex(std => std.id == id)

    if (idx == -1) {
        res.status(404)
        res.send(`This index ${id} is not found`)
        return
    }

    const deletedStd = students.splice(idx, 1)

    res.json(deletedStd)
})

// Update a Student
app.put('/students/:id', (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(403).send('There is a missing or invalid data')
        return
    }

    const id = req.params.id

    const idx = students.findIndex(std => std.id == id)

    if (idx == -1) {
        res.status(404).send(`This index ${id} is not found`)
        return
    }

    for (let i in req.body) {
        students[idx][i] = req.body[i]
    }

    const student = students[idx]

    res.json(student)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})