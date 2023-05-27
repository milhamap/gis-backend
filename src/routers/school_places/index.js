const express = require('express');
const router = express.Router();
const { createSchoolPlace, getsSchoolPlace, getSchoolPlace, deleteSchoolPlace } = require('../../resolvers/school_places');
const { fileStorage, fileFilter } = require('../../utils/files');
const { isAdmin } = require('../../middlewares');
const multer = require('multer');

const storageFile = multer.diskStorage(fileStorage)
const upload = multer({
        storage: storageFile,
        fileFilter: fileFilter, 
        fiedlSize: 2 * 1024 * 1024
    }).fields([
        { name: 'image', maxCount: 1 },
        { name: 'logo', maxCount: 1 }
    ])

router.post('/', upload, isAdmin, createSchoolPlace);
router.get('/', getsSchoolPlace);
router.get('/:slug', getSchoolPlace);
router.get('/:slug', getSchoolPlace);
router.delete('/:slug', deleteSchoolPlace);

module.exports = router;
