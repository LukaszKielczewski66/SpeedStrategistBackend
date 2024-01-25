const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/user-controller');
const IconController = require('../controllers/icon-controller');
const RoutesController = require('../controllers/route-controller');
const routeController = require('../controllers/route-controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/user', UserController.getUserData);
router.post('/updateUserData', UserController.updateUserData);
router.post('/changePassword', UserController.changeUserPassword);
router.get('/getIcon', UserController.getUserIcon);
router.post('/changeIcon', UserController.changeUserIcon);

router.get('/getIcons', IconController.getIcons);
router.post('/postIcon', IconController.saveIcon);

router.get('/routes', RoutesController.getAllRoutes);
router.get('/userRoutes', routeController.getUserRoutes);
router.post('/addRoute', RoutesController.addUserRoute);

module.exports = router;