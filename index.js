var express = require('express');
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var multer = require('multer');
var cloudinary = require('cloudinary');
var flash = require('connect-flash');
var db = require('./models');
var app = express();
var upload = multer({ dest: './uploads/' });

var images = [];

app.set('view engine', 'ejs');

app.use(flash());
app.use(ejsLayouts);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
  secret: 'jessieDog',
  resave: false,
  saveUninitialized: true
}));

app.use(function(req, res, next) {
  //remove later
  // req.session.userId = 1;

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
  db.flowerTaxonomy.findAll({
    include: [db.flowerPhoto]
  }).then(function(flowers) {
    // var screenWidth = window.screen.width;
    res.render('index', {flowers: flowers, cloudinary, alerts: req.flash()});  
  });
});

app.get('/myaccount', function(req, res) {
  var userId = res.locals.currentUser.id;
  if (res.locals.currentUser) {
    db.flowerPhoto.findAll({
      where: {
        userId: res.locals.currentUser.id
      },
      include: [db.user, db.flowerTaxonomy]
    }).then(function(photos) {
      res.render('myAccount', {photos: photos, cloudinary, alerts: req.flash()});
    });
  } else {
    req.flash("danger", "You need to be logged in to view this page");
    res.redirect("/");
  }
});

app.delete("/myaccount/flower/:id", function(req, res) {
  db.flowerPhoto.destroy({
    where: {
      id: req.params.id
    }
  }).then(function() {
    res.send({message: "Flower deleted!"});
  });
});

app.get('/error', function(req, res) {
  res.render('error');
});

app.use('/', require('./controllers/auth'));
app.use('/flower', require('./controllers/flower'));
app.listen(process.env.PORT || 3000);




