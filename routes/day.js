var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myObjects = require('../public/objects'),
    myFunctions = require('../public/main.js'),
    User = require('../models/user'),
    Class = require('../models/class'),
    Day = require('../models/day');
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
        instructor: req.body.instructor
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
            res.render('day/show', {foundClass: foundClass, day: foundDay});
        });
    });
});

module.exports = router;
