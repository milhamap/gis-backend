const knex = require('../../databases')

module.exports = {
    createMarker: async (req, res) => {
        try {
            const { name, region } = req.body
            console.log(name, region)
            const marker = await knex('markers').where({ name }).first()
            console.log(marker)
            if (marker) return res.status(400).json({ message: 'Marker Already Exists' })
            await knex('markers').insert({ name, region })
            res.json({ message: 'Create Marker Success' })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    },
    getsMarker: async (req, res) => {
        try {
            const markers = await knex('markers')
            res.json({ markers })
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }
}