var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    username: String,
    password: String,
    isAdmin: {type: Boolean, default: false},
    sessions: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Session"
            }
        }
    ],
    classes: [
        {
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class"
            },
            seasion_id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Session"
            }
        }
    ]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
