const { body } = require('express-validator')

module.exports = {
    loginValidator: [
        body('email')
            .notEmpty()
            .withMessage('Email Required')
            .isEmail()
            .withMessage('Format Email Invalid'),
        body('password')
            .notEmpty()
            .withMessage('Password Required')
            .isLength({ min: 6 })
            .withMessage('Password Minimal 6 Character')
    ]
}