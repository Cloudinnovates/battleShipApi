var express = require('express');
var router = express.Router();
var Session = require('models/session').Session;
var url = require('url');

router.post('/', function (req, res, next) {
    var newSession = new Session({
        userId: req.body.id,
        sessionId: req.body.sessionId
    });

    Session.findOneAndUpdate({userId : req.body.id}, { $set: { sessionId: req.body.sessionId }}, {upsert : true}, function (err, item) {
        res.send('OK');
    });
});

router.get('/', function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var id = url_parts.query.userId;
    Session.findOne({userId : id}, function (err, item) {
        res.send(item.sessionId);
    });
});

module.exports = router;
