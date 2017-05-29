var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var app = require('express')();
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');
var passport = require('passport');
var passportSession = require('passport-session');
var expressSession = require('express-session');
var cookieParser = require('cookie-parser');
var social = require('./app/passport/passport')(app, passport);



app.use(morgan('dev'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(passport.session());
app.use(cookieParser());
app.use(expressSession({ secret: 'kjdasbdlas83k54fs5d', resave: false, saveUninitialized: true, cookie: { secure: false }, expires: new Date(Date.now() + (60 * 60 * 24 * 7 * 1000)) }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);


mongoose.connect('mongodb://budget092:budget123@ds161048.mlab.com:61048/budgetdb', function(err) {
    if(err) {
        console.log('Not connected to the database ' + err);
    } else {
        console.log('Successfully connected to MongoDB');
    }
});

app.get('*', function(req,res) {
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Origin", "http://localhost:8080");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
})

app.listen(port, function() {
    console.log('Running the server on port ' + port);
});