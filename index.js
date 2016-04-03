var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var db = require('./models');
var flowerCtrl = require('./controllers/flower');
var app = express();

app.set('view-engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
// app.use(express.static(__dirname + '/views'));
app.use(ejsLayouts);
app.use('/flower', flowerCtrl);

app.use(session({
  secret: 'jessieDog',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(req, res) {
  res.render('index');
});

app.listen(process.env.PORT || 3000);