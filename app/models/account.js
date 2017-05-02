var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    user_id: { type: Schema.ObjectId, ref: 'UserSchema' },
    name: { type: String, required: true, default : 'aaa' },
    currency: { type: String, required: true, default : '$' },
    balance: { type: Number, required: true, default : 0 },
});

module.exports = mongoose.model('Account', AccountSchema);