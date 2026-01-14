const User = require('../models/user.models.db');
const asyncFunction = require('../util/asyncFunction');

// 1- Get Users
const getUsersController = asyncFunction(async (req, res) => {
    const users = await User.find().sort({id: -1})

    res.json(users);
    console.log('Fetched users successfully')
})

// 2- Get User
const getUserController = asyncFunction(async (req, res) => {
        const objectIdRegex = /^[a-f0-9]{24}$/;
        const id = req.params.id

        const isValidId = objectIdRegex.test(id);

        if (!isValidId)
            return res.status(400).send('Not a valid id');

        const user = await User.findById(id)

        if (!user)
            return res.status(404).send('No user found')

        res.json(user)
        console.log('Fetched user successfully')
})

// 3- Create User
const createUserController = asyncFunction(async (req, res, next) => {
        const newUser = await new User({
            ...req.body,
        })

        await newUser.save()

        res.json(newUser)
        console.log('Created a new user successfully');
})

// 4- Update User
const updateUserController = asyncFunction(async (req, res, next) => {
        const objectIdRegex = /^[a-f0-9]{24}$/;
        const id = req.params.id

        const isValidId = objectIdRegex.test(id);

        if (!isValidId)
            return res.status(400).send('Not a valid id');

        const user = await User.findByIdAndUpdate(id, req.body, {new: true})

        if (!user)
            return res.status(404).send('No user found')

        res.json(user)
        console.log('Updated user successfully')
})

// 5- Delete User
const deleteUserController = asyncFunction(async (req, res, next) => {
        const objectIdRegex = /^[a-f0-9]{24}$/;
        const id = req.params.id

        const isValidId = objectIdRegex.test(id);

        if (!isValidId)
            return res.status(400).send('Not a valid id');

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser)
            return res.status(404).send('No user found')

        res.json(deletedUser)
        console.log('Deleted user successfully')
})

// 6- Export Controllers
module.exports = {
    getUsersController,
    getUserController,
    createUserController,
    updateUserController,
    deleteUserController
};