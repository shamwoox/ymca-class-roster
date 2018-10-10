var express = require('express'),
    User = require('../models/user'),
    middleware = require('../middleware/index'),
    router = express.Router();

//Show more information about a user
router.get('/:id', middleware.isLoggedIn, function(req, res) {
    User.findById(req.params.id).exec(function(err, foundUser) {
        if(err || !foundUser){
            res.send("User not found");
        } else {
            console.log(foundUser)
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
    User.findByIdAndUpdate(req.params.id, req.body.user, function(err, updatedUser) {
        if(err) {
            res.redirect('/user/' + req.params.id +'/edit');
        } else {
            res.redirect('/user/' + req.params.id);
        }
    });
});


module.exports = router;