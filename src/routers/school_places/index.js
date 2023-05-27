const express = require('express');
const router = express.Router();
const { createSchoolPlace } = require('../../resolvers/school_places');
const { fileStorage, fileFilter } = require('../../utils/files');
const multer = require('multer');

const storageFile = multer.diskStorage(fileStorage)
const upload = multer({
    storage: storageFile,
    fileFilter: fileFilter, 
    fiedlSize: 5 * 1024 * 1024
})

router.post('/', upload.single('image'), createSchoolPlace);

module.exports = router;
