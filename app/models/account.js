var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var AccountSchema = new Schema({
    user_id: { type: Schema.ObjectId, ref: 'UserSchema', required: true },
    name: { type: String, required: true },
    currency: { type: String, required: true },
    balance: { type: Number, required: true },
});

module.exports = mongoose.model('Account', AccountSchema);