var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username : {
        type : String,
        unique : false,
        required : true
    }
});

exports.Game = mongoose.model('Game', schema);