const Ajv = require('ajv');
const User = require('../models/user.models');

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

// 1- Get Users
const getUsersController = (req, res) => {
    User.getUsers((users) => {
        res.json(users);
        console.log('Fetched users successfully')
    })
}

// 2- Get User
const getUserController = (req, res) => {
    const id = Number(req.params.id)

    User.getUser(id, (user) => {
        if (!user)
            return res.status(404).send('No user found')

        res.json(user)
        console.log('Fetched user successfully')
    })
}

// 3- Create User
const createUserController = (req, res) => {
    const isValid = validator(req.body)

    if (!isValid)
        return res.status(403).send('Forbidden')

    const newUser = new User({
        ...req.body,
    })

    newUser.createUser((user) => {
        res.json(user)
        console.log('Created a new user successfully');
    })
}

// 4- Update User
const updateUserController = (req, res) => {
    const isValid = validator(req.body)

    if (!isValid)
        return res.status(403).send('Forbidden')

    const id = Number(req.params.id)

    User.updateUser(id, req.body, (user) => {
        if (!user)
            return res.status(404).send('No user found')

        res.json(user)
        console.log('Updated user successfully')

    })
}

// 5- Delete User
const deleteUserController = (req, res) => {
    const id = Number(req.params.id)


    User.deleteUser(id, (user) => {
        if (!user)
            return res.status(404).send('No user found')

        res.json(user)
        console.log('Deleted user successfully')
    })


}

// 6- Export Controllers
module.exports = {
    getUsersController,
    getUserController,
    createUserController,
    updateUserController,
    deleteUserController
};