const Auth = require('../models/auth.models.db')

const updateAdminRoleController = async (req, res, next) => {
    try {
        const id = req.params.id

        const authUser = await Auth.findByIdAndUpdate(id, {admin: true}, {new: true})

        if (!authUser)
            return res.status(401).send('User not found')

        res.json(authUser)
    } catch (e) {
        next(e)
    }
}

module.exports = {
    updateAdminRoleController
};