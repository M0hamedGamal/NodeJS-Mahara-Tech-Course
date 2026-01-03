// 1- Require Express, Helmet, Ajv,
const express = require('express')
const helmet = require('helmet')
const Ajv = require('ajv');

const app = express()

app.use(express.json())
app.use(helmet())

const userSchema = {
    type: 'object',
    required: ['name', 'age'],
    minProperties: 2,
    maxProperties: 2,
    properties: {
        name: {
            type: 'string',
        },
        age: {
            type: 'number',
            minimum: 9,
            maximum: 100,
        }
    }
}

const ajv = new Ajv()
const validator = ajv.compile(userSchema)

const users = [
    {id: 1, name: 'Mohamed', age: 15},
    {id: 2, name: 'Ahmed', age: 25},
    {id: 3, name: 'Ali', age: 35},
]

app.get('/users', (req, res) => {
    res.json(users);
    console.log('Fetched users successfully')
})

app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id)

    const idx = users.findIndex(user => user.id === id)

    if (idx === -1) {
        return res.status(404).send('No user found')
    }

    res.json(users[idx])
    console.log('Fetched user successfully')
})

app.post('/users', (req, res) => {
    const isValid = validator(req.body)

    if (!isValid)
        return res.status(403).send('Forbidden')

    const newUser = {
        ...req.body,
        id: users.length + 1,
    }

    users.push(newUser)

    res.json(newUser)
    console.log('Created a new user successfully')
})

app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id)

    const idx = users.findIndex(user => user.id === id)

    if (idx === -1) {
        return res.status(404).send('No user found')
    }

    const isValid = validator(req.body)

    if (!isValid)
        return res.status(403).send('Forbidden')

    for (let i in req.body) {
        users[idx][i] = req.body[i]
    }

    res.json(users[idx])
    console.log('Updated user successfully')
})

app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id)

    const idx = users.findIndex(user => user.id === id)

    if (idx === -1) {
        return res.status(404).send('No user found')
    }

    const deletedUser = users.splice(idx, 1)
    res.json(deletedUser)
    console.log('Deleted user successfully')
})

module.exports = app