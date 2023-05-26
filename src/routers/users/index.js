const express = require('express');
const router = express.Router();
const { login } = require('../../resolvers/users');
const { loginValidator } = require('../../utils/validators/users');

// console.log(loginValidator)
router.post('/login', loginValidator, login);

module.exports = router;