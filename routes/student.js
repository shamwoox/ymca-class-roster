var express = require('express'),
    Student = require('../models/student'),
    middleware = require('../middleware/index'),
    User = require('../models/user'),
    myObjects = require('../public/objects'),
    myFunctions = require('../public/main'),
    Class = require('../models/class'),
    router = express.Router();

//Show all students
router.get('/', middleware.isLoggedIn, function(req, res) {
    Student.find({}, function(err, allStudents) {
        if(err) {
            console.log(err);
        } else {
            res.render('student/index',{students: allStudents});
        }
    });
});

//Show new student form
router.get('/new', middleware.isLoggedIn,function(req, res) {
    if(req.user.isAdmin) {
        res.render('student/new', {months: myObjects.months, genders: myObjects.genders});
    } else {
        req.flash('error', "You don't have permission to add a new student!");
        res.redirect('/students');
    }
});

//Create new student
router.post('/', middleware.isLoggedIn, function(req, res) {
    Student.create({
        firstName: req.body.student_first_name,
        middleName: req.body.student_middle_name,
        lastName: req.body.student_last_name,
        month: req.body.student_month,
        day: req.body.student_day,
        year: Number(req.body.student_year),
        gender: req.body.student_gender
    }, function(err, createdStudent) {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Successfully added new student!');
            res.redirect('/students');
        }
    });
});

//Show more information about student
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    Student.findById(req.params.id).exec(function(err, foundStudent) {
        if(err || !foundStudent) {
            req.flash('error', 'Student not found');
            res.redirect('/students');
        } else {
            var mastered = 0;
            var notMastered = 0;
            var notTaught = 0;
            for(keys in foundStudent.skills) {
                if(foundStudent.skills[keys] === '1') {
                    mastered++;
                } else if (foundStudent.skills[keys] === '0') {
                    notMastered++;
                } else {
                    notTaught++;
                }
            }
            res.render('student/show', {student: foundStudent, mastered: mastered, notMastered: notMastered,
                 notTaught: notTaught});
        }
    });
});

//Get student edit form
router.get('/:id/edit', function(req, res) {
    Student.findById(req.params.id, function(err, foundStudent) {
        if(err) {
            res.redirect('/');
        } else {
            if(req.user.isAdmin) {
                res.render('student/edit', {student: foundStudent, months: myObjects.months, genders: myObjects.genders});
            } else {
                req.flash('error', "You don't have permission to edit students!");
                res.redirect('/students/' + req.params.id);
            }
        }
    });
});

//Get student edit skills form
router.get('/:id/editskills', middleware.isLoggedIn, function(req, res) {
    Student.findById(req.params.id, function(err, foundStudent) {
        if(err) {
            res.redirect('/');
        } else {
            if(req.user.isAdmin) {
                if(foundStudent.skills === undefined) {
                    foundStudent.skills = {};
                }
                res.render('student/editSkills', {foundStudent: foundStudent, classes: myObjects.classes});
            } else {
                req.flash('error', "You don't have permission to edit students' skills!");
                res.redirect('/students/' + req.params.id);
            }
        }
    });
});

//Update student skills
router.put('/:id/editskills', middleware.isLoggedIn,function(req, res) {
    if(req.user.isAdmin) {
        var skillsArr = req.body.skills;
        if(skillsArr === undefined) {
            skillsArr = {};
        }
        Student.findByIdAndUpdate(req.params.id, {$set: {skills: skillsArr}}, function(err, updatedStudent) {
            if(err) {
                console.log(err);
                req.flash('error', 'An error has occured');
                res.redirect('/students/' + req.params.id + '/editskills');
            } else {
                req.flash('success', 'Successfuly saved student skills!');
                res.redirect('/students/' + req.params.id + '/editskills');
            }
        })
    } else {
        req.flash('error', "You don't have permission to edit skills.");
        res.redirect('/students/' + req.params.id);
    }
});

//UPDATE student
router.put('/:id', function(req, res) {
    if(req.user.isAdmin) {
        var student = req.body.student;
        Student.findByIdAndUpdate(req.params.id, student, function(err, updatedStudent) {
            if(err) {
                res.redirect('/students/' + req.params.id +'/edit');
            } else {
                req.flash('success', 'Successfully updated student profile!');
                res.redirect('/students/' + req.params.id);
            }
        });
    } else {
        req.flash('error', "You don't have permission to update students!");
        res.redirect('/students/' + req.params.id);
    }
});

//Destroy student
router.delete('/:id', function(req, res) {
    if(req.user.isAdmin) {
        Class.updateMany({'students._id': req.params.id}, {$pull: {students: {_id: req.params.id}}}, function(err, updatedClasses) {
            if(err) {
                console.log(err);
            } else {
                console.log(updatedClasses);
            }
        });
        Student.findByIdAndRemove(req.params.id, function(err) {
            if(err) {
                res.redirect('/students');
            } else {
                req.flash('success', 'Student successfully deleted!');
                res.redirect('/students');
            }
        });
        Class.update()
    } else {
        req.flash('error', "You don't have permission to delete students!");
        res.redirect('/students/' + req.params.id);
    }
});

module.exports = router;
