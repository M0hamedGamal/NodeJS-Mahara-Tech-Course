const validator = require('../utils/studentsValidationDB')

const studentsMiddleware = (req, res, next) => {
    if (req.method === 'GET') {
        console.log('This is a middleware for all /students APIs GET method')
    }
    next()
}

const stdsIdMiddleware = (req, res, nxt, value) => {
    const id = /^[0-9a-fA-F]{24}$/.test(value) // Rgx for _id

    if (!id) {
        return res.send('Invalid ID')
    }
    console.log(id)

    req.id = id
    nxt()
}

const stdDataValidatorMiddleware = (req, res, next) => {
    const valid = validator(req.body)

    if (!valid) {
        return res.status(403).send('There is a missing or invalid data')
    }
    next()
}

module.exports = {studentsMiddleware, stdsIdMiddleware, stdDataValidatorMiddleware}