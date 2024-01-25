const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const routeSchema = new Schema({
    title: String,
    author: String,
    origin: String,
    waypoints: String,
    destination: String,
    speed: String,
    time: String
})

const Route = mongoose.model('Route', routeSchema);

module.exports = Route;