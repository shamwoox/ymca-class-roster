var mongoose = require('mongoose');

var ClassSchema = new mongoose.Schema({
    levelName: String,
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session"
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
    ]
});

module.exports = mongoose.model("Class", ClassSchema);