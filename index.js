var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var db = require('./models');
var flowerCtrl = require('./controllers/flower');
var app = express();

app.set('view-engine', 'ejs');
app.use('/flower', flowerCtrl);
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/views'));
app.use(ejsLayouts);

app.use(session({
  secret: 'jessieDog',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  if(req.session.userId) {
    db.user.findById(req.session.userId).then(function(user) {
      req.currentUser = user;
      res.locals.currentUser = user;
      next();
    });
  } else {
    req.currentUser = false;
    res.locals.currentUser = false;
    next();
  }
});

app.get('/', function(req, res) {
  res.render('index');
});

app.use('/auth', require('./controllers/auth'));

app.listen(process.env.PORT || 3000);