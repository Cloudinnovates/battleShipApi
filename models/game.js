var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var playerSchema = new Schema({
    _id: String,
    shipsCellsCoords: Array,
    userShoots: Array,
    opponentShoots: Array,
    shipCellsDestroyed: Array,
    pureShots: Array,
    canFire: Boolean
});

var playerSchema = new Schema({
    players : [playerSchema, playerSchema]
});

exports.Game = mongoose.model('Game', playerSchema);