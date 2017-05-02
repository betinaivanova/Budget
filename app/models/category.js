var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var CategorySchema = new Schema({
  user_id: { type: Schema.ObjectId, ref: 'UserSchema', required: true },
  name: { type: String, required: true }
});

module.exports = mongoose.model('Category', CategorySchema);