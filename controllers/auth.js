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
      name: req.body.name,
      password: req.body.password
    }
  }).spread(function(user, created) {
    if (created) {
      res.redirect('/');
    } else {
      res.redirect('/auth/signup');
    }
  }).catch(function(err) {
    res.redirect('/auth/signup');
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
      res.redirect('/auth/login');
    } else if (user) {
      req.session.userId = user.id;
      res.redirect('/');
    } else {
      res.redirect('/auth/login');
    }
  });
});

router.get('/logout', function(req, res) {
  req.session.userId = false;
  res.redirect('/');
});

module.exports = router;