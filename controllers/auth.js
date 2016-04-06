var express = require('express');
var flash = require('connect-flash');
var db = require('../models');
var router = express.Router();
router.use(flash());

router.get('/signup', function(req, res) {
  res.render('auth/signup', {alerts: req.flash()});
});

router.post('/signup', function(req, res) {
  db.user.findOrCreate({
    where: {
      email: req.body.email
    },
    defaults: {
      username: req.body.username,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      req.flash("success", "Account created.")
      res.redirect('/');
      req.session.userId = user.id;
    } else {
      req.flash("danger", "Email already in use, try again.")
      res.redirect('/signup');
    }
  }).catch(function(err) {
    res.redirect('/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login', {alerts: req.flash()});
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  db.user.authenticate(email, password, function(err, user) {
    if(err) {

      res.redirect('/login');
    } else if (user) {
      req.session.userId = user.id;
      req.flash("success", "Login sucessful.")
      res.redirect('/');
    } else {
      req.flash("danger", "Username and/ or password incorrect.")
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.userId = false;
  req.flash("danger", "Logout successful.")
  res.redirect('/');
});

module.exports = router;