var User = require('../models/user');

var middlewareObj = {};

middlewareObj.isLoggedIn = function(req, res, next) {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'You must be logged in!');
    res.redirect("/login");
}

module.exports = middlewareObj;