const carIdMiddleware = (req, res, next) => {
    console.log(`The ${req.url} has id ${req.params.id}`)
    next()
}

module.exports = {
    carIdMiddleware
}