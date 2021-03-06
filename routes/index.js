var express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main'),
    myObjects = require('../public/objects'),
    Class = require('../models/class'),
    router = express.Router();

//Show homepage
router.get('/', middleware.isLoggedIn, function(req, res) {
  Class.find({'instructor.id': req.user._id}, function(err, foundClasses) {
    res.render('home', {months: myObjects.months, days: myObjects.days, foundClasses: foundClasses});
  });
});

//Show login page
router.get('/login', function(req, res) {
    res.render('login');
});

//Show register page
router.get('/register', function(req, res) {
    res.render('register');
});

//Create new account
router.post('/register', function(req, res) {
    var newUser = new User({
        firstName: req.body.first_name,
        lastName: req.body.last_name,
        email: req.body.email,
        phone: myFunctions.formatPhoneNumber(req.body.phone),
        username: req.body.username,
    });
    if(req.body.adminCode == "ilovecorgis"/*process.env.YMCA_ADMIN_CODE*/) {
        newUser.isAdmin = true;
    }
    if(req.body.adminCode.length > 0 && req.body.adminCode != "ilovecorgis"/*process.env.YMCA_ADMIN_CODE*/) {
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
