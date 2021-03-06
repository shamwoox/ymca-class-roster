var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myObjects = require('../public/objects'),
    myFunctions = require('../public/main.js'),
    User = require('../models/user'),
    Class = require('../models/class'),
    Day = require('../models/day'),
    Student = require('../models/student'),
    router = express.Router({mergeParams: true});

//Show new day form
router.get('/new', middleware.isLoggedIn, function(req, res) {
    Class.findById(req.params.class_id, function(err, foundClass) {
        for(key in myObjects.classes) {
            if(myObjects.classes[key].name === foundClass.levelName) {
                res.render('day/new', {skills: myObjects.classes[key].skills, foundClass: foundClass});
            }
        }
    });
});

//Create new day
router.post('/', function(req, res) {
    var newDay = {
        date: myFunctions.getTodaysDate(),
        time: myFunctions.getCurrentTime(),
        instructor: req.body.instructor,
    }
    Day.create(newDay, function(err, createdDay) {
        if(err) {
            console.log(err);
        } else {
            Class.findById(req.params.class_id, function(err, foundClass) {
                if(err) {
                    console.log(err);
                } else {
                    foundClass.days.date = createdDay.date;
                    foundClass.days.time = createdDay.time;
                    foundClass.days.push(createdDay);
                    foundClass.save();
                    req.flash('success', 'Successfully created a new day!');
                    res.redirect('/session/' + req.params.id + '/class/' + req.params.class_id);
                }
            });
        }
    });
});

//Show more info about day
router.get('/:day_id', middleware.isLoggedIn, function(req, res) {
    Class.findById(req.params.class_id, function(err, foundClass) {
        Day.findById(req.params.day_id, function(err, foundDay) {
            for(key in myObjects.classes) {
                if(myObjects.classes[key].name === foundClass.levelName) {
                    var presentStudents = [];
                    if(foundClass.students == null || foundClass.students == undefined) {
                        console.log(foundClass.students);
                    } else {
                        for(var i = 0; i < foundClass.students.length; i++) {
                            if(foundDay.students.indexOf(foundClass.students[i]._id) > -1) {
                                presentStudents.push(foundClass.students[i]._id);
                            }
                        }
                        if(foundDay.skills === undefined) {
                            foundDay.skills = {};
                        }
                        if(foundDay.topics === undefined) {
                            foundDay.topics = {};
                        }
                        res.render('day/show', {skills: myObjects.classes[key].skills, foundClass: foundClass, day: foundDay,
                            presentStudents: presentStudents, topics: myObjects.classes[key].topics
                        });
                    }
                }
            }
        });
    });
});

//Save/Update day
router.put('/:day_id', function(req, res) {
    var arr = req.body.students;
    if(arr === undefined) {
        arr = {};
    }
 
    Day.findByIdAndUpdate(req.params.day_id, {$set: {students: arr, notes: req.body.notes, skills: req.body.skills, topics: req.body.topics}}, function(err, foundDay) {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Successfully saved!');
            res.redirect('/session/' + req.params.id + "/class/" + req.params.class_id + "/day/" + req.params.day_id);
        }
    });
});

//Delete days
router.delete('/:day_id', function(req, res) {

    Class.update({_id: req.params.class_id}, {$pull: {days: {_id: req.params.day_id}}}, function(err, deletedDay) {
        if(err) {
            console.log(err);
        } else {
            Day.findByIdAndRemove(req.params.day_id, function(err, deletedDay) {
                if(err) {
                    console.log(err);
                } else {
                    req.flash('success', 'Successfully deleted a day!');
                    res.redirect('/session/' + req.params.id + '/class/' + req.params.class_id);
                }
            });
        }
    });
});


module.exports = router;
