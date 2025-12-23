const studentsMiddleware = (req, res, next) => {
    if (req.method === 'GET') {
        console.log('This is a middleware for all /students APIs GET method')
    }
    next()
}

const stdsIdMiddleware = (req, res, nxt, value) => {
    const id = Number(value)

    if (!id) {
        res.send('Invalid ID')
        return
    }
    console.log(id)

    req.id = id
    nxt()
}

module.exports = {studentsMiddleware, stdsIdMiddleware}