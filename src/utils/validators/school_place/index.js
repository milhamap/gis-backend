const { body } = require('express-validator')

module.exports = {
    postSchoolPlace: [
        body('name')
            .notEmpty()
            .withMessage('Name Required'),
        body('address')
            .notEmpty()
            .withMessage('Address Required'),
        body('accreditation')
            .notEmpty()
            .withMessage('Accreditation Required')
            .isLength({ max: 1 })
            .withMessage('Accreditation Maximal 1 Character'),
        body('since')
            .notEmpty()
            .withMessage('Since Required'),
        body('curriculum')
            .notEmpty()
            .withMessage('Curriculum Required'),
        body('latitude')
            .notEmpty()
            .withMessage('Latitude Required'),
        body('longitude')
            .notEmpty()
            .withMessage('Longitude Required'),
        body('major')
            .notEmpty()
            .withMessage('Major Required'),
        body('marker_id')
            .notEmpty()
            .withMessage('Marker Required'),
        body('name_headmaster')
            .notEmpty()
            .withMessage('Name Headmaster Required'),
        body('count_class')
            .notEmpty()
            .withMessage('Count Class Required'),
        body('count_student')
            .notEmpty()
            .withMessage('Count Student Required'),
        body('description')
            .notEmpty()
            .withMessage('Description Required')
    ]
}