var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var BudgetSchema = new Schema({
  account_id: { type: Schema.ObjectId, ref: 'AccountSchema' },
  user_id: { type: Schema.ObjectId, ref: 'UserSchema' },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  is_expense: { type: Boolean, default: true },
  description: { type: String }
});

module.exports = mongoose.model('Budget', BudgetSchema);