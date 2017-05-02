var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var RecordSchema = new Schema({
  account_id: { type: Schema.ObjectId, ref: 'AccountSchema', required: true },
  user_id: { type: Schema.ObjectId, ref: 'UserSchema', required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  is_expense: { type: Boolean, default: true },
  description: { type: String }
});

module.exports = mongoose.model('Record', RecordSchema);