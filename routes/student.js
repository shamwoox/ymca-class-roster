var express = require('express'),
    Student = require('../models/student'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main');
    router = express.Router();

router.get('/', middleware.isLoggedIn, function(req, res) {
    Student.find({}, function(err, allStudents) {
        if(err) {
            console.log(err);
        } else {
            res.render('student/index',{students: allStudents});
        }
    });
});

router.get('/new', middleware.isLoggedIn,function(req, res) {
    res.render('student/new');
});

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
            res.redirect('/students');
        }
    })
});

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


module.exports = router;