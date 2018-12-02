var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    levelName: String,
    session: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session"
      },
      season: String,
      year: String
    },
    startTime: String,
    endTime: String,
    dayOfWeek: String,
    instructor: {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            firstName: String,
            lastName: String,
    },
    students: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Student"
            },
            firstName: String,
            lastName: String
        }
    ],
    days: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Day"
            },
            date: String,
            instructor: String
        }
    ]
});

module.exports = mongoose.model("Class", ClassSchema);
