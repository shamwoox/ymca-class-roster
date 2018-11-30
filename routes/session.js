var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main'),
    myObjects = require('../public/objects'),
    User = require('../models/user'),
    Class = require('../models/class'),
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

//Show new session form
router.get('/new', middleware.isLoggedIn,function(req, res) {
    if(req.user.isAdmin) {
        res.render('session/new', {seasons: myObjects.seasons});
    } else {
        req.flash('error', "You don't have permission to add a new session!");
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

//Get edit form
router.get('/:id/edit', middleware.isLoggedIn, function(req, res) {
  Session.findById(req.params.id, function(err, foundSession) {
    if(err || !foundSession) {
      req.flash('error', 'An error has occured!');
      res.redirect('/session');
    } else {
      if(req.user.isAdmin) {
        res.render('session/edit', {seasons: myObjects.seasons, session: foundSession});
      } else {
        req.flash('error', 'You do not have permission to edit session!');
        res.redirect('/session');
      }
    }
  });
});

//Update session
router.put('/:id', middleware.isLoggedIn, function(req, res) {
  var session = req.body.session;
  Session.findByIdAndUpdate(req.params.id, session,function(err, foundSession) {
    if(err) {
        res.redirect('/session/' + req.params.id +'/edit');
    } else {
        req.flash('success', 'Successfully updated session!');
        res.redirect('/session/' + req.params.id);
    }
  });
});

//Delete session
router.delete('/:id', middleware.isLoggedIn, function(req, res) {
  //Remove classes in the deleted session
  Class.find({'session.id': req.params.id}, function(err, foundClasses) {
    if(foundClasses.length <= 0) {
      User.update({'sessions._id': req.params.id}, {$pull: {sessions: {_id: req.params.id}}}, function(err, deletedSession) {
          if(err) {
              console.log(err);
          }
      });
    }
    for(var i = 0; i < foundClasses.length; i++) {
      // console.log(foundClasses[i]._id);
      User.update({'sessions._id': req.params.id}, {$pull: {classes: {_id: foundClasses[i]._id}}}, function(err, deletedClasses) {
          if(err) {
              console.log(err);
          } else {
            //Remove session from instructors
            User.update({'sessions._id': req.params.id}, {$pull: {sessions: {_id: req.params.id}}}, function(err, deletedSession) {
                if(err) {
                    console.log(err);
                }
            });
          }
      });
    }

  });
  //Removes session from DB
  Session.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      res.redirect('/session');
    } else {
      Class.deleteMany({'session.id': req.params.id}, function(err, deletedClasses) {
        if(err) {
          console.log(err);
        } else {
          req.flash('success', 'Session successfully deleted!');
          res.redirect('/session');
        }
      });
    }
  });
});

//Show session's classes and instructors
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    Session.findById(req.params.id).exec(function(err, foundSession) {
        if(err || !foundSession) {
            req.flash('error', 'This session does not exist!');
            res.redirect('/session');
        } else {
            Class.find({'session.id': req.params.id}, function(err, foundClasses) {
                res.render('session/show', {classes: foundClasses, session: foundSession,
                    instructors: foundSession.instructors});
            });
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
        }
    });

    //Remove instructors from sessions
    Session.update({_id: req.params.id}, {$pull: {instructors: {_id: req.params.instructorId}}}, function(err, deletedInstructor) {
        if(err) {
            console.log(err);
        }
    });

    req.flash('success', 'Successfully removed an instructor from this session!');
    res.redirect('/session/' + req.params.id);
});

module.exports = router;
