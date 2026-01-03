const usersMiddleware = (req, res, next) => {
    console.log(req.url, ' => ' ,req.method)
    console.log('This is a middleware for users routes from Middleware folder')
    next()

}

const userIdMiddleware = (req, res, next) => {
    console.log(`The id is ${req.params.id}`)
    next()
}

module.exports = {
    usersMiddleware,
    userIdMiddleware,
}