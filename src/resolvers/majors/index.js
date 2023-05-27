const knex = require('../../databases')

module.exports = {
    createMajor: async (req, res) => {
        try {
            const { name } = req.body
            const major = await knex('majors').where({ name }).first()
            if (major) return res.status(400).json({ message: 'Major Already Exists' })
            await knex('majors').insert({ name })
            res.json({ message: 'Create Major Success' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getsMajor: async (req, res) => {
        try {
            const majors = await knex('majors')
            res.json({ majors })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}