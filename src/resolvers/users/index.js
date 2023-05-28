const bcrypt = require('bcrypt')
const knex = require('../../databases')
const { validationResult } = require('express-validator')
const { createUserToken, createRefreshToken } = require('../../helpers/tokens')

module.exports = {
    login: async (req, res) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() })
            const { email, password } = req.body
            const user = await knex('users').where({ email }).first()
            if (!user) return res.status(400).json({ message: 'Email Not Found' })
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: 'Password Wrong' })
            const payload = {
                id: user.id,
                email: user.email,
                role_id: user.role_id
            }
            const token = createUserToken(payload)
            const refreshToken = createRefreshToken(payload)
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