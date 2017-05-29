var User = require('../models/user');
var Account = require('../models/account');
var Budget = require('../models/budget');
var Category= require('../models/category');
var jwt = require('jsonwebtoken');
var passport = require('passport');
var passportSession = require('passport-session');
var cookieParser = require('cookie-parser');
var expressSession = require('express-session');
var secret = 'test';

module.exports = function(router) {
    //http://localhost:8080/api/users
    //USER REGISTRATION ROUTE
    router.post('/users', function(req,res) {
        var user = new User();
        user.username = req.body.username;
        user.email = req.body.email;
        user.password = req.body.password;
        //proverka dali poletata sa popalneni
        if( req.body.username == null || req.body.username == '' || req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == '') {
            // res.send('Уверете се, че всички полета са попълнени!');
            res.json({ success : false, message : 'Уверете се, че всички полета са попълнени!' });
        } else {
            user.save(function(err) {
                if(err) {
                    // res.send('Съществува потребител с този и-мейл!');
                    res.json({ success : false, message : 'Съществува потребител с този и-мейл!' });
                } else {
                    // res.send('Регистрирахте се успешно!');
                    res.json({ success : true, message : 'Регистрирахте се успешно!' });
                }
            });
        }
    });

    //http://localhost:8080/api/authenticate
    //USER LOGIN ROUTE
    router.post('/authenticate', function(req,res,next) {
        User.findOne( { email : req.body.email }).select('email username password').exec(function(err, user) {
            if(err) throw err;

            if(!user) {
                res.json( { success : false, message : 'Could not authenticate user' });
            } else if (user) {
                if(req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json( { success : false, message : 'Не е въведена парола!' });
                }
                if(!validPassword) {
                    res.json( { success : false, message : 'Невалидна парола' });
                } else {
                    req.session.user = user;
                    var token = jwt.sign( { email : user.email }, secret, { expiresIn: '24h'});
                    res.json( { success : true, message : 'Успешно влизане в системата!', token : token });
                }
            }
        });
    });
    
    router.use(function(req,res,next) {

        var token = req.body.token || req.body.query || req.headers['x-access-token'];

        if(token) {
            // verify token
            jwt.verify(token, secret, function(err, decoded) {
                if(err) {
                    res.json( { success : false, message : 'Token invalid' });
                } else {
                    req.decoded = decoded;
                    next();
                }
            })
        } else {
            res.json( { success : false, message : 'No token provided' } );
        }
    });

    router.post('/me', function(req,res) {
        res.send(req.decoded);
    });

    //http://localhost:8080/api/accounts
    router.post('/accounts', function(req,res) {
        var account = new Account();
        account.user_id = req.session.user._id;
        // var sessionUser = req.session.user._id;
        // console.log(sessionUser);
        account.name = req.body.name;
        account.currency = req.body.currency;
        if(req.body.name == '' || req.body.name == null || req.body.currency == '' || req.body.currency == null) {
            res.send('Уверете се, че всички полета са попълнени');
        } else {
            account.save(function(err) {
                if(err) {
                    res.send(err);
                } else {
                    res.send('account created');
                }
            })
        }
    });

     router.post('/categories', function(req,res) {
        var category = new Category();
        category.user_id = req.session.user._id;
        category.name = req.body.name;
        if(req.body.name == '' || req.body.name == null) {
            res.send('Уверете се, че всички полета са попълнени');
        } else {
            category.save(function(err) {
                if(err) {
                    res.send(err);
                } else {
                    res.send('category created');
                }
            })
        }
    });
    router.get('/categories', function(req,res) {

        var userid = req.session.user._id;
        Category.find({ user_id : userid }, function(err, categories) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(categories);
                }
            })
    
    });

    router.put('/categories/:categoryId', function(req,res) {
        var categoryId = req.params.categoryId;
        Category.remove({ _id : categoryId }, function(err,res) {
            if(err) {
                res.send(err);
            } else {
                // console.log(res);
            }
        })
    });
    router.get('/accounts', function(req,res) {
         var userid = req.session.user._id;
         Account.find({ user_id : userid }, function(err, accounts) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(accounts);
                }
            })
        
    });

    router.put('/accounts/:accountId', function(req,res) {
        var accountId = req.params.accountId;
        Account.remove({ _id : accountId }, function(err,res) {
            if(err) {
                res.send(err);
            } else {
                // console.log(res);
            }
        })
    });

     router.post('/details', function(req,res) {
        var budget = new Budget();
        budget.user_id = req.session.user._id;
        budget.category =  req.body.category;
        budget.amount =  req.body.amount;
        budget.date =  Date.now();
        budget.is_expense =  req.body.is_expense;
        budget.description = req.body.description;
    
        if(req.body.amount == '' || req.body.amount == null || req.body.category == '' || req.body.category == null || req.body.description == '' || req.body.description == null) {
            res.send('Уверете се, че всички полета са попълнени');
        } else {
            budget.save(function(err) {
                if(err) {
                    res.send(err);
                } else {
                    res.send('budget created');
                }
            })
        }
    });

    router.get('/details', function(req,res) {
        Budget.find(function(err, budgets) {
                if(err) {
                    res.send(err);
                } else {
                    res.json(budgets);
                }
            })
        
    });

    router.put('/details/:budgetId', function(req,res) {
        var budgetId = req.params.budgetId;
        Budget.remove({ _id : budgetId }, function(err,res) {
            if(err) {
                res.send(err);
            } else {
                // console.log(res);
            }
        })
    });

    

    return router;
}


