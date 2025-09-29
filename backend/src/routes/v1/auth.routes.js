const express = require('express');
const router = express.Router();
const { signup, login } = require('../../controllers/auth.controller');

/**
 * @openapi
 * /auth/signup:
 *  post:
 *    summary: Register new user
 */
router.post('/signup', signup);
router.post('/login', login);

module.exports = router;
