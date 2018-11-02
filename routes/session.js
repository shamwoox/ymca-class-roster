var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main');
    router = express.Router();

router.get('/', middleware.isLoggedIn, function(req, res) {
    Session.find({}, function(err, allSessions) {
        if(err) {
            console.log(err);
        } else {
            res.render('session/index', {sessions: allSessions});
        }
    });
});

var seasons = [
    'Fall',
    'Winter',
    'Spring',
    'Summer'
];

//Show new session form
router.get('/new', middleware.isLoggedIn,function(req, res) {
    if(req.user.isAdmin) {
        res.render('session/new', {seasons: seasons});
    } else {
        req.flash('error', "You don't have permission to add a new student!");
        res.redirect('/session')
    }
});

//Create new session
router.post('/', middleware.isLoggedIn, function(req, res) {
    var newSession = req.body.session;
    Session.create(newSession, function(err, createdSession) {
        if(err) {
            console.log(err);
        } else{
            console.log(newSession);
            req.flash('success', 'Successfuly created new session!');
            res.redirect('/session');
        }
    });
});

module.exports = router;