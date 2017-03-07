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
    Game.update({'players._id': req.body.userId}, {'$set': {
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
    console.log('req.body.gameId');
    console.log(req.body.gameId);
    console.log('req.body.userId');
    console.log(req.body.userId);

    Game.findById(req.body.gameId, function (err, doc) {
        doc.players.forEach(function (item, key) {
            if(item._id == req.body.userId) {
                res.send(item);
            }
        })
    });
});

router.post('/shoot', function (req, res, next) {
    console.log(req.body);


    // Game.findById(req.body.gameId, function (err, doc) {
    //     doc.players.forEach(function (item, key) {
    //         if(item._id == req.body.userId) {
    //             res.send(item);
    //         }
    //     })
    // });
});

module.exports = router;
