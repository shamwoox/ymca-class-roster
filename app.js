var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    User = require('./models/user'),
    flash = require('connect-flash');

mongoose.connect('mongodb://localhost/ymca', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride('_method'));

app.use(require("express-session") ({
    secret: "I really love corgis",
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

var indexRoutes = require('./routes/index');
var userRoutes = require('./routes/user');
var studentRoutes = require('./routes/student');
var classRoutes = require('./routes/session');
app.use("/", indexRoutes);
app.use("/user/", userRoutes);
app.use("/students/", studentRoutes);
app.use("/session/", classRoutes);

app.listen('5000', function() {
    console.log('Server running on port 5000');
});