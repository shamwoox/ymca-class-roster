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

const seasons = [
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
    if (req.user.isAdmin) {
        var newSession = req.body.session;
        Session.create(newSession, function(err, createdSession) {
            if(err) {
                console.log(err);
            } else {
                req.flash('success', 'Successfuly created new session!');
                res.redirect('/session');
            }
        });
    } else {
        req.flash('error', 'You do not have permission to add a new session!');
        res.redirect('/session');
    }
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
router.get('/:id/instructor/new', middleware.isLoggedIn, function(req, res) {
    if(req.user.isAdmin) {
        User.find({}, function(err, foundInstructors) {
            if(err) {
                console.log(err);
            } else {
                Session.findById(req.params.id, function(err, foundSession) {
                    res.render('user/include', {instructors: foundInstructors, session: foundSession});
                });
            }
        });
    } else {
        req.flash('error', 'You do not have permission to add new instructor!');
        res.redirect('/session/' + req.params.id);
    }
});

//Add new instructors to session
router.post('/:id/instructor/new', middleware.isLoggedIn, function(req, res) {
    Session.findById(req.params.id, function(err, foundSession) {
        if(err || !foundSession) {
            req.flash('error', 'No session found');
            res.redirect('/session/' + req.params.id);
        } else {
            var instructorID = req.body.new_instructor;
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

//Removing instructors from sessions
router.put('/:id/instructor/:instructorId', function(req, res) {
    //Remove sessions from instructors
    User.update({_id: req.params.instructorId}, {$pull: {sessions: {_id: req.params.id}}}, function(err, deletedSession) {
        if(err) {
            console.log(err);
        } else {

        }
    });

    //Remove instructors from sessions
    Session.update({_id: req.params.id}, {$pull: {instructors: {_id: req.params.instructorId}}}, function(err, deletedInstructor) {
        if(err) {
            console.log(err);
        } else {
            // console.log("SUCCESSFULLY REMOVED INSTRUCTORS FROM SESSIONS");
            // console.log(deletedInstructor);
        }
    });
    req.flash('success', 'Successfully removed an instructor from this session!');
    res.redirect('/session/' + req.params.id);
});

router.get('/:id/class/new', middleware.isLoggedIn, function(req, res) {
    const classes = [
        {
            name: "A / Water Discovery",
            skills: [
                "Blow bubbles on surface, assisted",
                "Front tow chin in water, assisted",
                "Water exit parent & child together",
                "Water entry parent & child together",
                "Back float assisted, head on shoulder",
                "Roll assisted, back to front & front to back",
                "Front float chin in water, assisted",
                "Back tow assisted, head on shoulder",
                "Wall grab assisted"
            ]
        },
        {
            name: "B / Water Exploration",
            skills: [
                "Blow bubbles mouth and nose submerged, assisted",
                "Front tow blow bubbles, assisted",
                "Water exit assisted",
                "Water entry assisted",
                "Back float assisted, head on chest",
                "Roll assisted, back to front & front to back",
                "Front float blow bubbles, assisted",
                "Back tow assisted, head on chest",
                "Monkey crawl assisted, on edge, 5ft."
            ]
        },
        {
            name: "1 / Acclimation",
            skills: [
                "Submerge bob independently",
                "Front glide assisted, to wall, 5ft.",
                "Water exit independently",
                "Jump, push, turn, grab assisted",
                "Back float assisted, 10 secs, recover independently",
                "Roll assisted, back to front & front to back",
                "Front float assisted, 10 secs, recover independently",
                "Back glide assisted, at wall, 5ft.",
                "Swim, float, swim assisted, 10 ft."
            ]
        },
        {
            name: "2 / Water Movement",
            skills: [
                "Submerge look at object on bottom",
                "Front glide 10 ft. (5 ft. preschool)",
                "Water exit independently",
                "Jump, push, turn, grab",
                "Back float 20 secs. (10 secs. preschool)",
                "Roll back to front & front to back",
                "Front float 20 secs. (10 secs. preschool)",
                "Back glide 10 ft. (5 ft. preschool)",
                "Tread water 10 secs, near wall, & exit",
                "Swim, float, swim 5 yd."
            ]
        },
        {
            name: "3 / Water Stamina",
            skills: [
                "Submerge retrieve objec in chest-deep water",
                "Swim on front 15 yd. (10 yd. preschool)",
                "Water exit independently",
                "Jump, swim, turn, swim, grab 10 yd.",
                "Swim on back  15 yd. (10 yd. preschool)",
                "Roll back to front & front to back",
                "Tread water 1 min. & exit (30 secs. preschool)",
                "Swim, float, swim 25 yd. (15 yd. preschool)"
            ]
        },
        {
            name: "4 / Stroke Introduction",
            skills: [
                "Endurance any stroke or combination of strokes, 25 yd.",
                "Front crawl rotary breathing, 15 yd.",
                "Back crawl 15 yd.",
                "Dive sitting",
                "Resting stroke elementary backstroke, 15 yd.",
                "Tread water scissor & whip kick, 1 min.",
                "Breaststroke kick, 15 yd.",
                "Butterfly kick, 15 yd."
            ]
        },
        {
            name: "5 / Stroke Development",
            skills: [
                "Endurance any stroke or combination of strokes, 50 yd.",
                "Front crawl bent-arm recovery, 25 yd.",
                "Back crawl pull, 25 yd.",
                "Dive kneeling",
                "Resting stroke sidestroke, 25 yd.",
                "Tread water scissor & whip kick, 2 min.",
                "Breaststroke 25 yd.",
                "Butterfly simultaneous arm action & kick, 15 yd."
            ]
        },
        {
            name: "6 / Stroke Mechanics",
            skills: [
                "Endurance any stroke or combination of strokes, 150 yd.",
                "Front crawl flip-turn, 50 yd.",
                "Back crawl pull and flip-turn, 50 yd.",
                "Dive standing",
                "Resting stroke elementary backstroke or sidestroke, 50 yd.",
                "Tread water retreive object off bottom, tread 1 min.",
                "Breaststroke open turn, 50 yd.",
                "Butterfly 25 yd."
            ]
        }
    ]
    //db.users.find({sessions: {_id: ObjectId("5beb79e5f4a72b0c757954ef")}})
    User.find({sessions: {_id: req.params.id}}, function(err, foundInstructors) {
        res.render('class/new', {classes: classes, instructors: foundInstructors});
    });
});

module.exports = router;