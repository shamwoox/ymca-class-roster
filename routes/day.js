var express = require('express'),
    Session = require('../models/session'),
    middleware = require('../middleware/index'),
    myObjects = require('../public/objects'),
    User = require('../models/user'),
    Class = require('../models/class'),
    Day = require('../models/day');
    router = express.Router({mergeParams: true});

//Show new day form
router.get('/new', function(req, res) {
    res.send('Make a new day');
});

module.exports = router;
