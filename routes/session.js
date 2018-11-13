var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main'),
    User = require('../models/user'),
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
        } else {
            console.log(newSession);
            req.flash('success', 'Successfuly created new session!');
            res.redirect('/session');
        }
    });
});

//Show session's classes
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    Session.findById(req.params.id).exec(function(err, foundSession) {
        if(err || !foundSession) {
            req.flash('error', 'This session does not exist!');
            res.redirect('/session');
        } else {
            res.render('session/show', {session: foundSession, instructors: foundSession.instructors});
        }
    });
});

//Show the add page for adding an instructor to a session
router.get('/:id/new/instructor', middleware.isLoggedIn, function(req, res) {
    User.find({}, function(err, foundInstructors) {
        if(err) {
            console.log(err);
        } else {
            Session.findById(req.params.id, function(err, foundSession) {
                res.render('user/include', {instructors: foundInstructors, session: foundSession});
            });
        }
    });
});

//Add new instructors to session
router.post('/:id/new/instructor', middleware.isLoggedIn, function(req, res) {
    Session.findById(req.params.id, function(err, foundSession) {
        if(err || !foundSession) {
            req.flash('error', 'No session found');
            res.redirect('/session/' + req.params.id);
        } else {
            var instructorID = req.body.new_instructor;
            console.log(instructorID);
            User.findById(instructorID, function(err, foundInstructor) {
                if(err || !foundInstructor) {
                    req.flash('error', 'Instructor not found!');
                    res.redirect('/session/' + req.params.id);
                } else {
                    foundSession.instructors.firstName = foundInstructor.firstName;
                    foundSession.instructors.lastName = foundInstructor.lastName;
                    foundSession.instructors.push(foundInstructor);
                    
                    foundSession.save();

                    foundInstructor.sessions.push(foundSession);
                    foundInstructor.save();
                    req.flash('success', 'Successfully added instructor!');
                    res.redirect('/session/' + req.params.id);
                }
            });
        }
    });
});


module.exports = router;