module.exports = (req, res, nxt) => {
    console.log('This is a middleware for all APIs with all methods')
    console.log(`${req.method} ${req.url}`)
    nxt()
}