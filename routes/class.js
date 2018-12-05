var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myObjects = require('../public/objects'),
    User = require('../models/user'),
    Class = require('../models/class'),
    Student = require('../models/student'),
    Day = require('../models/day'),
    router = express.Router({mergeParams: true});

const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


//Show new class form
router.get('/new', middleware.isLoggedIn, function(req, res) {
    User.find({sessions: {_id: req.params.id}}, function(err, foundInstructors) {
        res.render('class/new', {sessionId: req.params.id, classes: myObjects.classes,
                                instructors: foundInstructors, dayOfWeek: myObjects.days});
    });
});

//Add new class to session
router.post('/new', function(req, res) {
    if(req.user.isAdmin) {
        User.findById(req.body.instructorId, function(err, foundInstructor) {
            Session.findById(req.params.id, function(err, foundSession) {
                if(err) {
                  console.log(err);
                }
                var newClass = {
                    levelName: req.body.levelName,
                    startTime: req.body.startTime,
                    endTime: req.body.endTime,
                    dayOfWeek: req.body.dayOfWeek,
                    instructor: {
                        firstName: foundInstructor.firstName,
                        lastName: foundInstructor.lastName
                    }
                }
                newClass.instructor.id = foundInstructor;
                newClass.session = {};
                newClass.session.id = foundSession;
                newClass.session.season = foundSession.season;
                newClass.session.year = foundSession.year;
                Class.create(newClass, function(err, createdClass) {
                    if(err) {
                        console.log(err);
                    } else {
                        Session.update({_id: req.params.id}, {$push: {classes: createdClass}}, function(err, pushedClass) {
                            if(err) {
                                console.log(err);
                            } else {
                                console.log(pushedClass);
                            }
                        });
                        User.update({_id: req.body.instructorId}, {$push: {classes: createdClass}}, function(err, pushedClass) {
                            if(err) {
                                console.log(err);
                            }
                        });
                        req.flash('success', 'Successfully created new class!');
                        res.redirect('/session/' + req.params.id);

                        // Send sms to instructor using Twilio
                        let sms_message = 'You have been added to the following class: ' + foundSession.season +
                        ' ' + foundSession.year + ' ' + createdClass.levelName + '. Details: ' + createdClass.dayOfWeek + ' from ' +
                        createdClass.startTime + ' to ' + createdClass.endTime;
                        client.messages
                        .create({
                           body: sms_message,
                           from: '+16094453618',
                           to: '+1' + foundInstructor.phone.replace(/[^A-Z0-9]/ig, "")
                         })
                        .then(message => console.log(message.sid))
                        .done();
                    }
                });
            });
        });
    }
});

//Show more information about class
router.get('/:class_id', middleware.isLoggedIn, function(req, res) {
    Class.findById(req.params.class_id, function(err, foundClass) {
        if(err || !foundClass) {
            console.log(err);
        } else {
            res.render('class/show', {foundClass: foundClass});
        }
    });
});

//Show add-student-to-class form
router.get('/:class_id/student/new', middleware.isLoggedIn, function(req, res) {
    Student.find({'classes._id': {$ne: req.params.class_id}}, function(err, foundStudents) {
        if(err) {
            console.log(err);
        } else {
            Class.findById(req.params.class_id, function(err, foundClass) {
                res.render('student/include', {students: foundStudents, foundClass: foundClass});
            });
        }
    });
});

//Add student to class
router.post('/:class_id/student', middleware.isLoggedIn, function(req, res) {
    Class.findById(req.params.class_id, function(err, foundClass) {
        if(err) {
            console.log(err);
        } else {
            Student.findById(req.body.new_students, function(err, foundStudent) {
                foundClass.students.firstName = foundStudent.firstName;
                foundClass.students.lastName = foundStudent.lastName;
                foundClass.students.push(foundStudent);
                foundClass.save();

                foundStudent.classes.levelName = foundClass.levelName;
                foundStudent.classes.push(foundClass);
                foundStudent.save();
                req.flash('success', 'Successfully added student to class!');
                res.redirect('/session/' + req.params.id + '/class/' + req.params.class_id);
            });
        }
    });
});


module.exports = router;
