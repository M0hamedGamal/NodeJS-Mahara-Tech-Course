module.exports =  (req, res, next, value) => {
    console.log(`The color's id is ${value}`)
    next()
}