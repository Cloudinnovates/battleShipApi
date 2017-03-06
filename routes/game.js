var express = require('express');
var router = express.Router();
var Game = require('models/game').Game;

router.post('/', function (req, res, next) {
    var newGame = new Game([
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
    ]);

    newGame.save(function (err, newGame) {
        console.log(newGame);
        res.send(newGame._id);
    });
});

router.post('/set-fleet', function (req, res, next) {
    console.log(res.body);
    res.send('Fleet was updated!')
});

module.exports = router;
