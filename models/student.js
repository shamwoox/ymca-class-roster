var mongoose = require('mongoose');

// var skillSet = new Set();

var StudentSchema = new mongoose.Schema({
    firstName: String,
    middleName: String,
    lastName: String,
    month: String,
    day: Number,
    year: Number,
    gender: String,
    classes: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class"
        },
        levelName: String,
        season: String,
        year: String
      }
    ],
    skills: []
});

module.exports = mongoose.model("Student", StudentSchema);
