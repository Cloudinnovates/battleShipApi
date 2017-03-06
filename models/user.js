var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    username : {
        type : String,
        unique : false,
        required : true
    },
    status : {
        type : String,
        unique : false,
        required : true
    }
});

exports.User = mongoose.model('User', schema);