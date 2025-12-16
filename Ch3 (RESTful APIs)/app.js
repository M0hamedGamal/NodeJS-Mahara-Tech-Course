const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 8080

const students = [
    {id: '1', name: 'Student 1'},
    {id: '2', name: 'Student 2'},
    {id: '3', name: 'Student 3'},
    {id: '4', name: 'Student 4'},
]

app.use(express.json()) // for JSON bodies
app.use(express.urlencoded({ extended: true })) // for Form data

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
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

app.get('/students', (req, res) => {
    console.log('Students page')
    res.json(students)
})

// Using Params [:id]
app.get('/students/:id', (req, res) => {
    const id = req.params.id
    const student = students.find(std => std.id === id)

    if (!student)
        res.send('Not Found')

    res.json(student)
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})