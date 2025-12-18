// Profile Practice
const express = require('express')
const app = express()
const port = process.env.PORT || 7000
const Ajv = require('ajv')

const users = [
    {id: 1, name: 'Mohamed', age: 30},
    {id: 2, name: 'Gamal', age: 27},
    {id: 3, name: 'Ali', age: 20},
    {id: 4, name: 'Badr', age: 25},
]

const userSchema = {
    type: 'object',
    required: ['name', 'age'],
    maxProperties: 2,
    minProperties: 2,
    properties: {
        name: {
            type: 'string',
            pattern: '^[A-Z][a-z]*$'
        },
        age: {
            type: 'number',
            minimum: 20,
            maximum: 50,
        }
    },
}

const ajv = new Ajv()
const validate = ajv.compile(userSchema)

// Middlewares
app.use(express.json())
// app.use(express.urlencoded({extended: true}))

app.get('/users', (req, res) => {
    res.json(users)
})

app.post('/users', (req, res) => {
    const isValidUser = validate(req.body)

    if (!isValidUser) {
        res.status(403).send('Invalid User Schema')
        return
    }

    const id = users.length + 1
    const newUser = {
        ...req.body,
        id
    }

    users.push(newUser)

    res.json(newUser)
})

app.put('/users/:id', (req, res) => {
    const isValidUser = validate(req.body)

    if (!isValidUser) {
        res.status(403).send('Invalid User Schema')
        return
    }

    const userId = req.params.id

    const idx = users.findIndex(std => std.id === Number(userId))

    if (idx === -1) {
        res.status(403).send(`UserId ${userId} Not Found`)
        return
    }

    for (let i in req.body) {
        users[idx][i] = req.body[i]
    }

    const updatedUser = users[idx]

    res.json(updatedUser)
})

app.delete('/users/:id', (req, res) => {
    const id = req.params.id

    const idx = users.findIndex(std => std.id === Number(id))

    if (idx === -1) {
        res.send(`The user ${id} does not exist`)
        return
    }

    const deletedUser = users[idx]

    users.splice(idx, 1)

    res.json(deletedUser)
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})