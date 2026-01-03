const fs = require("fs")
const path = require("path")

const userFilePath = path.join(__dirname, '../data/user.data.json')

class User {
    constructor({name, age, password}) {
        this.name = name;
        this.age = age;
    }

    static getUsers(callback) {
        fs.readFile(userFilePath, 'utf8', (err, data) => {
            if (err)
                return console.log(err)

            const users = JSON.parse(data)

            callback(users)
        })
    }

    static getUser(id, callback) {
        fs.readFile(userFilePath, 'utf8', (err, data) => {
            if (err)
                return console.log(err)

            const users = JSON.parse(data)

            const idx = users.findIndex(user => user.id === id)

            if (idx === -1)
                return callback(undefined)

            callback(users[idx])
        })
    }

    createUser(callback) {
    //     1- Read file
        fs.readFile(userFilePath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const users = JSON.parse(data)

            const newUser = {
                ...this,
                id: users.length + 1,
            }

            users.push(newUser)

            fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
                if (err) return console.log(err)

                callback(newUser)
            })
        })
    }

    static updateUser(id, userData, callback) {
        fs.readFile(userFilePath, 'utf8', (err, data) => {
            if (err) return console.log(err)

            const users = JSON.parse(data)

            const idx = users.findIndex(user => user.id === id)

            if (idx === -1)
                return callback(undefined)

            for (let i in userData) {
                users[idx][i] = userData[i]
            }

            fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
                if (err) return console.log(err)

                callback(users[idx])
            })
        })
    }

    static deleteUser(id, callback) {
        fs.readFile(userFilePath, 'utf8', (err, data) => {
            if (err) return console.log(err)
            const users = JSON.parse(data)
            const idx = users.findIndex(user => user.id === id)
            if (idx === -1)
                return callback(undefined)
            const deletedUser = users.splice(idx, 1)
            fs.writeFile(userFilePath, JSON.stringify(users), (err) => {
                if (err) return console.log(err)
                callback(deletedUser)
            })
        })
    }
}

module.exports = User