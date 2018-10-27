var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    month: String,
    day: Number,
    year: Number,
    gender: String
});

module.exports = mongoose.model("Student", StudentSchema);