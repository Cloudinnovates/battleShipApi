var mongoose = require('../libs/mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
    userId : {
        type : String,
        unique : true,
        required : true
    },
    sessionId : {
        type : String,
        unique : true,
        required : true
    }
});

exports.Session = mongoose.model('Session', schema);