const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const knex = require('../../databases')
const { body, validationResult } = require('express-validator')

module.exports = {
    login: async (req, res) => {
        console.log('login')
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty())
                return res.status(400).json({ errors: errors.array() })
            const { email, password } = req.body
            const user = await knex('users').where({ email }).first()
            if (!user)
                return res.status(400).json({ message: 'Email Not Found' })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch)
                return res.status(400).json({ message: 'Password Wrong' })
            const payload = {
                id: user.id,
                email: user.email,
                role_id: user.role_id
            }
            const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.JWT_EXPIRE_TIME })
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE_TIME })
            await knex('users').where({ id: user.id }).update({ refresh_token: refreshToken })
            res.json({
                message: 'Login Success',
                user: payload,
                token,
            })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}