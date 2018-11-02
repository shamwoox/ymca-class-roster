var express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main'),
    router = express.Router();

var months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];

var days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

router.get('/', middleware.isLoggedIn, function(req, res) {
    res.render('home', {months: months, days: days});
});

router.get('/login', function(req, res) {
    res.render('login');
});

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
    var newUser = new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: myFunctions.formatPhoneNumber(req.body.phone),
        username: req.body.username,
    });
    if(req.body.adminCode == process.env.YMCA_ADMIN_CODE) {
        newUser.isAdmin = true;
    }
    if(req.body.adminCode.length > 0 && req.body.adminCode != process.env.YMCA_ADMIN_CODE) {
        req.flash('error', 'Incorrect admin code');
        res.redirect('/register');
    } else {
        User.register(newUser, req.body.password, function(err, user) {
            if(err) {
                req.flash('error', err.message);
                res.redirect('/register');
            }
            passport.authenticate('local')(req, res, function() {
                req.flash('success', 'Account successfully created! Welcome ' + req.body.first_name + " " +req.body.last_name);
                res.redirect('/');
            });
        });
    }
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
    failureRedirect: "/login",
    failureFlash: true,
}),function(req, res) {
    req.flash('success', 'Welcome back!');
    res.redirect('/');
});

//handling logout logic
router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success', 'You have successfully logged out!');
    res.redirect('/login');
});

module.exports = router;