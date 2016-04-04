var express = require('express');
var router = express.Router();

router.get('/upload', function(req, res) {
  res.render('upload');
});

module.exports = router;