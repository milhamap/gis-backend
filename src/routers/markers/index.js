const express = require('express');
const router = express.Router();
const { createMarker, getsMarker } = require('../../resolvers/markers');
const { isAdmin } = require('../../middlewares');

router.post('/', isAdmin, createMarker);
router.get('/', isAdmin, getsMarker);

module.exports = router;