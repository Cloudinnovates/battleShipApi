var express = require('express');
var router = express.Router();
var User = require('models/user').User;

router.get('/', function (req, res, next) {
    User.find(function (err, response) {
        res.end(JSON.stringify(response));
    });
});

module.exports = router;
