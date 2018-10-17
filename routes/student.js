var express = require('express'),
    Student = require('../models/student'),
    middleware = require('../middleware/index'),
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
    res.render('student/new');
});

//Create new student
router.post('/', middleware.isLoggedIn, function(req, res) {
    Student.create({
        firstName: req.body.student_first_name,
        lastName: req.body.student_last_name,
        age: req.body.student_age,
        gender: req.body.student_gender
    }, function(err, createdStudent) {
        if(err) {
            console.log(err);
        } else {
            req.flash('success', 'Successfully added new student!');
            res.redirect('/students');
        }
    })
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
            res.render('student/edit', {student: foundStudent});
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