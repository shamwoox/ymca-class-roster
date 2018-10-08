var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
    passport = require('passport'),
    LocalStrategy = require("passport-local")
    User = require('./models/user');

mongoose.connect('mongodb://localhost/ymca', { useNewUrlParser: true });

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use(require("express-session") ({
    secret: "I really love corgis",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var indexRoutes = require('./routes/index');
app.use("/", indexRoutes);

app.listen('5000', function() {
    console.log('Server running on port 5000');
});