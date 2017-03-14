var express = require('express');
var router = express.Router();
var Game = require('models/game').Game;

router.post('/', function (req, res, next) {
    var newGame = new Game({
        players: [
            {
                _id: req.body.player1Id,
                shipsCellsCoords: [],
                userShoots: [],
                opponentShoots: [],
                shipCellsDestroyed: [],
                pureShots: [],
                canFire: true
            },
            {
                _id: req.body.player2Id,
                shipsCellsCoords: [],
                userShoots: [],
                opponentShoots: [],
                shipCellsDestroyed: [],
                pureShots: [],
                canFire: false
            }
        ]
    });

    newGame.save(function (err, newGame) {
        res.send(newGame);
    });
});

router.post('/set-fleet', function (req, res, next) {
    Game.update({$and: [{'_id': req.body.gameId}, {'players._id': req.body.userId}]}, {'$set': {
        'players.$.shipsCellsCoords': req.body['fleet']
    }}, function(err) {
        if(!err) {
            res.send('fleet updated!');
        } else {
            res.send(err);
        }
    });
});

router.post('/get-fleet', function (req, res, next) {
    Game.findById(req.body.gameId, function (err, doc) {
        doc.players.forEach(function (item, key) {
            if(item._id == req.body.userId) {
                res.send(item);
            }
        })
    });
});

router.post('/shoot', function (req, res, next) {
    var userId = req.body.userId;
    var coords = req.body.coords;
    var user = {};
    var opponent = {};
    var hit = false;

    Game.findById(req.body.gameId, function (err, doc) {
        if(doc.players[0]._id == userId) {
            user = doc.players[0];
            opponent = doc.players[1];
        } else {
            user = doc.players[1];
            opponent = doc.players[0];
        }
        if(user.canFire) {
            for (var i = 0; i < user.shipCellsDestroyed.length; i++) {
                if(JSON.stringify(user.shipCellsDestroyed[i]) == JSON.stringify(coords)) {
                    res.send({ result: 'wait', message: ' You made this move already!'});
                    return false;
                    break;
                }
            }
            for (var i = 0; i < user.pureShots.length; i++) {
                if(JSON.stringify(user.pureShots[i]) == JSON.stringify(coords)) {
                    res.send({ result: 'wait', message: ' You made this move already!'});
                    return false;
                    break;
                }
            }
            var shipsCoords = opponent.shipsCellsCoords;
            user.canFire = false;
            opponent.canFire = true;
            for (var i = 0; i <= shipsCoords.length; i++) {
                if(JSON.stringify(shipsCoords[i]) == JSON.stringify(coords)) {
                    hit = true;
                    break;
                }
            }
            if(hit) {
                user.canFire = true;
                opponent.canFire = false;
                user.shipCellsDestroyed = user.shipCellsDestroyed.concat(coords);
                if(user.shipCellsDestroyed.length == '20') {
                    res.send({ result: 'end', message: coords});
                } else  {
                    res.send({ result: 'hit', message: coords});
                }
                doc.save(function (err) {});
            } else {
                user.canFire = false;
                opponent.canFire = true;
                user.pureShots = user.pureShots.concat(coords);
                doc.save(function (err) {
                    res.send({ result: 'pass', message: coords});
                });
            }
        } else {
            res.send({ result: 'wait', message: 'Please wait... It is not your turn.'});
        }
    });
});

router.post('/get-data', function (req, res, next) {
    var userId = req.body.userId;
    var user = {};
    var opponent = {};
    Game.findById(req.body.gameId, function (err, doc) {
        if(doc.players[0]._id == userId) {
            user = doc.players[0];
        } else {
            user = doc.players[1];
        }
        res.send(JSON.stringify({
            user : {
                pureShots : user.pureShots,
                shipCellsDestroyed : user.shipCellsDestroyed
            }
        }));
    });
});

router.post('/end', function (req, res, next) {

});

module.exports = router;
