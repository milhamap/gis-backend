const express = require('express');
const router = express.Router();
const { createMajor, getsMajor } = require('../../resolvers/majors');
const { isAdmin } = require('../../middlewares');

router.post('/', isAdmin, createMajor);
router.get('/', isAdmin, getsMajor);

module.exports = router;