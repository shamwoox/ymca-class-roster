var express = require('express'),
    User = require('../models/user'),
    router = express.Router();

router.get('/:id', function(req, res) {
    User.findById(req.params.id).exec(function(err, foundUser) {
        if(err || !foundUser){
            res.redirect("back");
        } else {
            console.log(foundUser)
            res.render("user/show", {user: foundUser});
        }
    });
});

module.exports = router;