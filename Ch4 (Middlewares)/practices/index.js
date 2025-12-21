// Practice Rooms
const express = require('express')
const Ajv = require('ajv')
const cookieParser = require('cookie-parser')
const helmet = require('helmet')
const app = express()
const port = process.env.PORT || 7000

const rooms = [
    {id: 1, room: 'small'},
    {id: 2, room: 'medium'},
    {id: 3, room: 'big'},
    {id: 4, room: 'hall'},
]

const roomSchema = {
    type: 'object',
    required: ['room'],
    maxProperties: 1,
    minProperties: 1,
    properties: {
        room: {
            type: 'string',
            pattern: '^[A-Za-z0-9]+( [A-Za-z0-9]+)*$',
        },
    }
}

const ajv = new Ajv()
const validate = ajv.compile(roomSchema)

// Middlewares
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use(helmet())

app.use((req, res, next) => {
    console.log('This middleware fires for all requests')
    next()
})

app.use('/rooms', (req, res, next) => {
    if (req.method === 'GET') {
        console.log('This is a get request that the end point has /rooms')
    }
    next()
})

app.param('id', (req, res, next, value) => {
    console.log(`This middleware fires for any request has id as a param. The id is: ${value}`)
    req.id = value
    next()
})


app.get('/rooms', (req, res, next) => {
    console.log('This is an inline Middleware')
    res.cookie('stdName', Buffer.from('Gamal').toString("base64"), {httpOnly: true})
    next()
}, (req, res) => {
    res.json(rooms)
})

app.get('/rooms/:id', (req, res) => {
    const id = Number(req.id)

    const idx = rooms.findIndex(room => room.id === id)

    console.log(Buffer.from(req.cookies.stdName, "base64").toString())

    if (idx === -1) {
        res.status(404).send(`Room with id ${id} not found`)
        return
    }

    res.json(rooms[idx])
})

app.post('/rooms', (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(400).send(`Room is not valid`)
        return
    }

    const newRoom = {
        ...req.body,
        id: rooms.length + 1
    }

    rooms.push(newRoom)

    res.json(newRoom)

})

app.put('/rooms/:id', (req, res) => {
    const valid = validate(req.body)

    if (!valid) {
        res.status(400).send(`Update Room is not valid`)
        return
    }

    const id = Number(req.id)

    const idx = rooms.findIndex(room => room.id === id)

    if (idx === -1) {
        res.status(404).send(`Room with id ${id} not found`)
        return
    }

    for (let i in req.body) {
        rooms[idx][i] = req.body[i]
    }

    res.json(rooms[idx])
})

app.delete('/rooms/:id', (req, res) => {
    const id = Number(req.id)

    const idx = rooms.findIndex(room => room.id === id)

    if (idx === -1) {
        res.status(404).send(`Room with id ${id} not found`)
        return
    }

    const deletedRoom = rooms.splice(idx, 1)

    res.json(deletedRoom)

})


app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})