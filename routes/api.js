const express = require('express');
const router = new express.Router();

const UserController = require('../controllers/user-controller');
const IconController = require('../controllers/icon-controller');
const RoutesController = require('../controllers/route-controller');
const DriverProfileController = require('../controllers/driverProfile-controller');

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
router.post('/userRoutes', RoutesController.getUserRoutes);
router.post('/addRoute', RoutesController.addUserRoute);
router.put('/updateTimesTab', RoutesController.updateTimesTab);
router.post('/getRouteTimes', RoutesController.getRouteTimes);

router.get('/driverProfile', DriverProfileController.getDriverProfile);
router.post('/addDriverProfile', DriverProfileController.addDriverProfile);
router.put('/updateProperties', DriverProfileController.updateProperties);
router.put('/updateLastRide', DriverProfileController.updateLastRide);

module.exports = router;