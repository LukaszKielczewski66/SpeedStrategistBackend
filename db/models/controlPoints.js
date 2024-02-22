const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const controlPointsSchema = new Schema({
    email: String,
    routeName: String,
    controls: String,
    times: String
})

const ControlPoints = mongoose.model('ControlPoints', controlPointsSchema)

module.exports = ControlPoints;