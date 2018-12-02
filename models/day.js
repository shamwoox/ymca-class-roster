var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  date: String,
  time: String,
  topics: String,
  notes: String,
  next: String,
  students: [
    {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
      },
      firstName: String,
      lastName: String
    }
  ],
  instructor: String,
  skills: [
    {
      name: String,
    }
  ]
});

module.exports = mongoose.model("Day", DaySchema);
