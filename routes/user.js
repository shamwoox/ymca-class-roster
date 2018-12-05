var express = require('express'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main'),
    Class = require('../models/class'),
    router = express.Router();

//List all instructors
router.get('/', middleware.isLoggedIn, function(req, res) {
    User.find({}, function(err, allInstructors) {
        if(err) {
            console.log(err);
        } else {
            res.render('user/index', {instructors: allInstructors});
        }
    });
});

//Show more information about a user
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id).exec(function(err, foundUser) {
        if(err || !foundUser){
            res.send("User not found");
        } else {
            Class.find({'instructor.id': req.params.id}, function(err, foundClasses) {
                res.render("user/show", {user: foundUser, foundClasses: foundClasses});
            });
        }
    });
});

//Get edit form for user information
router.get('/:id/edit',function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            res.redirect('/');
        } else {
            if(req.user.isAdmin || req.user._id == req.params.id) {
                res.render('user/edit', {user: foundUser});
            } else {
                req.flash('error', "You don't have permission to edit users!");
                res.redirect('/user/' + req.params.id);
            }
        }
    });
});

//UPDATE user
router.put('/:id', function(req, res) {
    var user = req.body.user;
    user.phone = myFunctions.formatPhoneNumber(user.phone);
    User.findByIdAndUpdate(req.params.id, user, function(err, updatedUser) {
        if(err) {
            res.redirect('/user/' + req.params.id +'/edit');
        } else {
            req.flash('success', 'Successfully updated user profile!');
            res.redirect('/user/' + req.params.id);
        }
    });
});

//Destroy user
router.delete('/:id', function(req, res) {
    User.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            res.redirect('/user');
        } else {
            req.flash('success', 'User successfully deleted!');
            res.redirect('/user');
        }
    });
});


module.exports = router;