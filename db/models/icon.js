const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const iconSchema = new Schema({
    iconName: String,
    iconLink: String
})

const Icon = mongoose.model('Icon', iconSchema);

module.exports = Icon;