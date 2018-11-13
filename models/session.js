var mongoose = require('mongoose');

var SessionSchema = new mongoose.Schema({
    season: String,
    year: String,
    startDate: String,
    endDate: String,
    classes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class"
        }
    ],
    instructors: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            firstName: String,
            lastName: String
        },
    ],
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student"
        }
    ]
});

module.exports = mongoose.model("Session", SessionSchema);