const jwt = require('jsonwebtoken');

const hasAdminRoleMiddleware = (req, res, next) => {
    try {
        const token = req.headers['x-auth-token'];
        if (!token)
            return res.status(401).send('Access denied');

        // In case error, will throw error.
        const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);

        const admin = verifiedToken.isAdmin;

        if (!admin)
            return res.status(401).send('Access denied. Not an admin');

        next()
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    hasAdminRoleMiddleware
};