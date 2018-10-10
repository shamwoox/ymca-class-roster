var express = require('express'),
    passport = require('passport'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    router = express.Router();

router.get('/', middleware.isLoggedIn, function(req, res) {
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
        phone: formatPhoneNumber(req.body.phone),
        username: req.body.username,
    });
    if(req.body.adminCode == process.env.YMCA_ADMIN_CODE) {
        console.log(process.env.YMCA_ADMIN_CODE);
        newUser.isAdmin = true;
    }
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
    req.flash('success', 'You have successfully logged out!');
    res.redirect('/login');
});

function formatPhoneNumber(phoneNumberString) {
    var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
      var intlCode = (match[1] ? '+1 ' : '')
      return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

module.exports = router;