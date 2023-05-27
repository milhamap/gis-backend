const knex = require('../../databases')
const { uploadImage } = require('../../utils/storages')

module.exports = {
    createSchoolPlace: async (req, res) => {
        try {
            // console.log(req.file.filename + '-' + req.file.originalname)
            return res.status(200).json({
                message: 'Create School Place Success',
                file: req.file
            })
        } catch (error) {
            res.status(500).json({ 
                message: error.message 
            })
        }
    }
}