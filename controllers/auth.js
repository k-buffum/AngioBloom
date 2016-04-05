var express = require('express');
var db = require('../models');
var router = express.Router();

router.get('/signup', function(req, res) {
  res.render('auth/signup');
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
      console.log('Signup success');
      res.redirect('/');
      req.session.userId = user.id;
    } else {
      console.log('Signup failed');
      res.redirect('/signup');
    }
  }).catch(function(err) {
    res.redirect('/signup');
  });
});

router.get('/login', function(req, res) {
  res.render('auth/login');
});

router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  db.user.authenticate(email, password, function(err, user) {
    if(err) {
      res.redirect('/login');
    } else if (user) {
      console.log("Login success");
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      console.log("Login failed");
      res.redirect('/login');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});

module.exports = router;