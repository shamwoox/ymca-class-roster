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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
});

module.exports = mongoose.model("Session", SessionSchema);