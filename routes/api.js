const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/user-controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);


module.exports = router;