var db = require('../models/user.js');

exports.list = function(req,res) {
    db.budgetModel.find({ user_id : req.user._id }, function(err, results) {
        if(err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(results);
    });
};

exports.create = function(req,res) {
    if(req.body.name === undefined || req.body.currency === undefined) {
        return res.json(400, { message : 'Bad Data' });
    }

    var budget = new db.budgetModel();
    budget.name = req.body.name;
    budget.currency = req.body.currency;
    budget.balance = 0;
    budget.uder_id = req.user._id

    budget.save(function(err) {
        if(err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(200, budget);
    });
};