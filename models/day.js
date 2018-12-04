var mongoose = require('mongoose');

var DaySchema = new mongoose.Schema({
  date: String,
  time: String,
  topics: String,
  notes: String,
  next: String,
  students: [
  ],
  instructor: String,
  skills:{},
  topics:{}
});

module.exports = mongoose.model("Day", DaySchema);
