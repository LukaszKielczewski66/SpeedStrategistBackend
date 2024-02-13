const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const driverProfileSchema = new Schema({
    userEmail: String,
    allRoutes: Number,
    firstPlaces: Number,
    secondPlaces: Number,
    thirdPlaces: Number,
    lastRide: String,
    lastPlace: Number
})

const DriverProfile = mongoose.model('DriverProfile', driverProfileSchema);

module.exports = DriverProfile;