const fileStorage = () => {
    return {
        filename: (req, file, cb) => {
            cb(null, new Date().getTime())
        }
    }
}

const fileFilter = (req, file, cb) => {
    if( 
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

module.exports = {
    fileStorage,
    fileFilter
}