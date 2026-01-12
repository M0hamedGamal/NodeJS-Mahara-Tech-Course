const Auth = require('../models/auth.models.db')

const updateAdminRoleController = async (req, res) => {
    try {
        const id = req.params.id

        const authUser = await Auth.findByIdAndUpdate(id, {admin: true}, {new: true})

        if (!authUser)
            return res.status(401).send('User not found')

        res.json(authUser)
    } catch (e) {
        res.status(400).send(e)
    }
}

module.exports = {
    updateAdminRoleController
};