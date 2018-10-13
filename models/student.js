var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number,
    gender: String
});

module.exports = mongoose.model("Student", StudentSchema);