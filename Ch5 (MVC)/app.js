const express = require('express')
const path = require("path");
const app = express()
const port = process.env.PORT || 8080
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const studentsRouter = require('./routes/students')
const generalMiddleware = require('./middlewares/general')
// Middlewares
app.use(express.json()) // for JSON bodies
app.use(express.urlencoded({extended: true})) // for Form data
app.use(cookieParser()) // Allow to access cookies in all requests
app.use(helmet()) // Add more HTTP heders to secure the app

app.use(generalMiddleware)

app.get('/', (req, res, next) => {
        console.log('Welcome to the Root page.')

        // Go to the next middleware
        next()
    },
    (req, res) => {
        res.sendFile(path.join(__dirname, 'public/index.html'))
    }
)

app.use(express.static('public')) // Read static files from public folder
app.use('/students', studentsRouter)

app.get('/welcome.html', (req, res) => {
    const query = req.query
    const fName = req.query.fnm
    const lName = req.query.lnm
    console.log(query, fName, lName)

    res.sendFile(path.join(__dirname, 'public/welcome.html'))
})

app.get('/abc', (req, res) => {
    console.log(Buffer.from(req.cookies.userName, 'base64').toString())
    console.log(req.cookies.userAge)

    res.sendStatus(200)
})

app.post('/welcome.html', (req, res) => {
    console.log(req.body)
    const {fnm: fName, lnm: lName} = req.body

    res.cookie('userName', Buffer.from(`${fName} ${lName}`).toString('base64'))
    res.cookie('userAge', 30, {httpOnly: true})

    res.send(`<h1>Hello ${fName} ${lName}.👋</h1>`)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}...`)
})