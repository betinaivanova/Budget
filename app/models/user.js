var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username : {type : String, required : true},
    email : {type : String, lowercase : true, unique : true, required : true},
    password : {type : String, required : true}
});

var Budget = new Schema({
    user_id : { type : Schema.ObjectId, ref : 'User', required : true},
    name : { type : String, required : true}
})

//middleware
UserSchema.pre('save', function(next) {
    var user = this;
    // kriptirane na parolata
    bcrypt.hash(user.password, null, null, function(err, hash) {
        if(err) return next(err);
        user.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var budgetModel = mongoose.model('Budget', Budget);
module.exports = mongoose.model('User', UserSchema);
exports.budgetModel = budgetModel;