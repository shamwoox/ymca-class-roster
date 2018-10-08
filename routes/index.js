var express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    router = express.Router();

router.get('/', isLoggedIn, function(req, res) {
    console.log(req.user);
    res.render('home');
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
        phone: req.body.phone,
        username: req.body.username,
    });
    if(req.body.adminCode == process.env.ADMIN_CODE) {
        newUser.isAdmin = true;
    }
    User.register(newUser, req.body.password, function(err, user) {
        if(err) {
            console.log(err.message);
            res.redirect('/login');
        }
        passport.authenticate('local')(req, res, function() {
            res.redirect('/');
        });
    });
});

//handling login logic
router.post("/login", passport.authenticate("local", 
{
    successRedirect: "/",
    failureRedirect: "/login"
}),function(req, res) {
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;