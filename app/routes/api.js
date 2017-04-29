var User = require('../models/user');
var jwt = require('jsonwebtoken');
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
    router.post('/authenticate', function(req,res) {
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
                    var token = jwt.sign( { email : user.email }, secret, { expiresIn: '24h'});
                    res.json( { success : true, message : 'Браво, ти успя!', token : token });
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

    return router;
}


