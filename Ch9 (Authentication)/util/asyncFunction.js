const asyncFunction = (routerHandler) => {
    return async (req, res, next) => {
        try {
            await routerHandler(req, res)
        } catch (e) {
            next(e)
        }
    }
}


module.exports = asyncFunction