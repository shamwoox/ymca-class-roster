var mongoose = require('mongoose');

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
    skills: [
      {
        name: {
          "A / Water Discovery": {type: Boolean, default: false}
        },
        skills: [
          {
            "Blow bubbles on surface, assisted": {type: Boolean, default: false}
          }
        ]
      }
    ]
});

module.exports = mongoose.model("Student", StudentSchema);
