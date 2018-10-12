var express = require('express'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    myFunctions = require('../public/main');
    router = express.Router();

//List all instructors
router.get('/', middleware.isLoggedIn, function(req, res) {
    User.find({isAdmin: false}, function(err, allInstructors) {
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
            res.render("user/show", {user: foundUser});
        }
    });
});

//Get edit form for user information
router.get('/:id/edit',function(req, res) {
    User.findById(req.params.id, function(err, foundUser) {
        if(err) {
            res.redirect('/');
        } else {
            res.render('user/edit', {user: foundUser});
        }
    });
});

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


module.exports = router;