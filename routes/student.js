var express = require('express'),
    Student = require('../models/student'),
    middleware = require('../middleware/index'),
    User = require('../models/user'),
    myObjects = require('../public/objects'),
    myFunctions = require('../public/main');
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
            res.render('student/show', {student: foundStudent})
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

//UPDATE student
router.put('/:id', function(req, res) {
    var student = req.body.student;
    Student.findByIdAndUpdate(req.params.id, student, function(err, updatedStudent) {
        if(err) {
            res.redirect('/students/' + req.params.id +'/edit');
        } else {
            req.flash('success', 'Successfully updated student profile!');
            res.redirect('/students/' + req.params.id);
        }
    });
});

//Destroy student
router.delete('/:id', function(req, res) {
    Student.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect('/students');
        } else {
            req.flash('success', 'Student successfully deleted!');
            res.redirect('/students');
        }
    });
});

module.exports = router;
