const userValidator = require("../util/user.validations.db");

const usersMiddleware = (req, res, next) => {
    console.log(req.url, ' => ' ,req.method)
    console.log('This is a middleware for users routes from Middleware folder')
    next()

}

const userIdMiddleware = (req, res, next) => {
    console.log(`The id is ${req.params.id}`)
    next()
}

const userValidatorMiddleware = (req, res, next) => {
    const isValid = userValidator(req.body)

    if (!isValid)
        return res.status(403).send('Forbidden')
}

module.exports = {
    usersMiddleware,
    userIdMiddleware,
    userValidatorMiddleware,
}