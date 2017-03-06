var express = require('express');
var router = express.Router();
var User = require('models/user').User;
var url = require('url');

router.post('/', function (req, res, next) {
    var username = req.body.username;
    var user = new User({
        username: username,
        status: 'free'
    });
    user.save(function (err, newUser) {
        res.send(newUser);
    });
});

router.delete('/', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query.id;
    User.findByIdAndRemove(id, function(err) {
        res.send('User deleted!');
    });
});

module.exports = router;
