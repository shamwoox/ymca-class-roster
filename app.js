var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose')
    passport = require('passport'),
    LocalStrategy = require("passport-local"),
    methodOverride = require('method-override'),
    User = require('./models/user'),
    flash = require('connect-flash');

var indexRoutes = require('./routes/index'),
    userRoutes = require('./routes/user'),
    studentRoutes = require('./routes/student'),
    sessionRoutes = require('./routes/session'),
    classRoutes = require('./routes/class');

mongoose.connect('mongodb://localhost/ymca', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

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

app.use("/", indexRoutes);
app.use("/user", userRoutes);
app.use("/students", studentRoutes);
app.use("/session/:id/class", classRoutes);
app.use("/session", sessionRoutes);

app.listen('5000', function() {
    console.log('Server running on port 5000');
});
