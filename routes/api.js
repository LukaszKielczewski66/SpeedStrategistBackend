const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/user-controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/user', UserController.getUserData);
router.post('/updateUserData', UserController.updateUserData);
router.post('/changePassword', UserController.changeUserPassword);


module.exports = router;