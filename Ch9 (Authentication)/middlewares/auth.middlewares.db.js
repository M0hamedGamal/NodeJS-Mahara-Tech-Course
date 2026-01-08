const {registerValidator, loginValidator} = require("../util/auth.validations.db");

const registerValidatorMiddleware = (req, res, next) => {
    const isValid = registerValidator(req.body)
    if (!isValid) {
        return res.status(403).send('Forbidden');
    }

    next()
}

const loginValidatorMiddleware = (req, res, next) => {
    const isValid = loginValidator(req.body)

    if (!isValid) {
        return res.status(403).send('Forbidden');
    }

    next()
}


module.exports = {
    registerValidatorMiddleware,
    loginValidatorMiddleware
};