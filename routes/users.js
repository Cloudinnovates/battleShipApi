var express = require('express');
var router = express.Router();
var User = require('models/user').User;

router.get('/', function (req, res, next) {
    User.find(function (err, response) {
        res.end(JSON.stringify(response));
    });
});

router.post('/set-status', function(req, res, next) {
    var id = req.body.id;
    var status = req.body.status;
    User.findByIdAndUpdate(id, {'status' : status}, function(err, doc) {
        res.send('User status updated!');
    });
});

router.post('/get-status', function(req, res, next) {
    var id = req.body.id;
    User.findById(id, function(err, doc) {
        res.send(doc.status);
    });
});

module.exports = router;
