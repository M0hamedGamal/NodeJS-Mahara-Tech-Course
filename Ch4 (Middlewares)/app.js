const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 8080
const Ajv = require('ajv')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')

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
app.use(express.static('public')) // Read static files from public folder
app.use(cookieParser()) // Allow to access cookies in all requests
app.use(helmet()) // Add more HTTP heders to secure the app

/**
 * Add a middleware for all routes with all methods
 * */
app.use((req, res, nxt) => {
    console.log('This is a middleware for all APIs with all methods')
    console.log(`${req.method} ${req.url}`)
    nxt()
})

/**
 * Add a middleware for all requests start with /students and GET method
 * '/students'
 * '/students/:id'
 * */
app.use('/students', (req, res, next) => {
    if (req.method === 'GET') {
        console.log('This is a middleware for all /students APIs GET method')
    }
    next()
})

/**
 * Add a param middleware for all requests start with /students that have id as a param
 * '/students/:id'
 * value => The value of the param. In this case the param is 'id'
 * */
app.param('id', (req, res, nxt, value) => {
    console.log('Id:', value)

    if (!Number(value)) {
        res.send('Invalid ID')
        return
    }

    req.id = Number(value)

    nxt()

})

/** Inline Middleware */
app.get('/', (req, res, next) => {
        console.log('Welcome to the Root page.')

        // Go to the next middleware
        next()
    },
    (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    }
)

app.get('/students', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*')

    console.log('Students page')
    res.json(students)
})


app.get('/students/:id', (req, res) => {
    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
    const student = students.find(std => std.id == id)

    if (!student)
        res.send('Not Found')

    res.json(student)
})

app.get('/welcome.html', (req, res) => {
    const query = req.query
    const fName = req.query.fnm
    const lName = req.query.lnm
    console.log(query, fName, lName)

    res.sendFile(path.join(__dirname, 'public/welcome.html'))
})


app.get('/abc', (req, res) => {
    /**
     * Buffer.from(req.cookies.userName, 'base64').toString() => to decode the value
     */
    console.log(Buffer.from(req.cookies.userName, 'base64').toString())
    console.log(req.cookies.userAge)

    res.sendStatus(200)
})

app.post('/welcome.html', (req, res) => {
    console.log(req.body)
    const {fnm: fName, lnm: lName} = req.body

    /**
     * Buffer.from(`${fName} ${lName}`).toString('base64') => to encode the value
     * httpOnly option => to avoid show the cookie in browser console via document.cookie
     */
    res.cookie('userName', Buffer.from(`${fName} ${lName}`).toString('base64'))
    res.cookie('userAge', 30, {httpOnly: true})

    res.send(`<h1>Hello ${fName} ${lName}.👋</h1>`)
})

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

app.delete('/students/:id', (req, res) => {
    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
    const idx = students.findIndex(std => std.id == id)

    if (idx == -1) {
        res.status(404)
        res.send(`This index ${id} is not found`)
        return
    }

    const deletedStd = students.splice(idx, 1)

    res.json(deletedStd)
})

app.put('/students/:id', (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(403).send('There is a missing or invalid data')
        return
    }

    // Now the req has an id. Thnx for param middleware
    const id = req.id
    // const id = req.params.id
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