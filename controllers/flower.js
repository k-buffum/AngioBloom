var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var db = require('../models');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

var images = [];

router.get('/upload', function(req, res) {
  var userId = res.locals.currentUser.id;

  // if (res.locals.currentUser) {
    res.render('upload');
  // } else {
    // alert("You need to be logged in to access this page");
  // }
});

router.post('/upload', upload.single('imgUpload'), function(req, res) {
  var userId = res.locals.currentUser.id;

  db.flowerTaxonomy.findOrCreate({
    where: {
      name: req.body.flowerType
    },
    defaults: {
      location: req.body.location,
      scientificName: req.body.scientificName,
      genus: req.body.genus,
      order: req.body.order,
      family: req.body.family,
      lowTemperature: parseFloat(req.body.lowTemp),
      highTemperature: parseFloat(req.body.highTemp),
      terrain: req.body.terrain,
      lowHumidity: req.body.lowHumidity,
      highHumidity: req.body.highHumidity,
      sunlightIntensity: req.body.sunlightIntensity,
      sunlightFrequency: req.body.sunlightFrequency,
      waterIntensity: req.body.waterIntensity,
      waterFrequency: req.body.waterFrequency
    }
  }).spread(function(flower, created) {
    cloudinary.uploader.upload(req.file.path, function(result) {  
      db.flowerPhoto.create({
        userId: userId,
        flowerTaxonomyId: flower.id,
        picture: result.public_id,
        location: req.body.location
      })
      .then(function(picture) {
        flower.flowerPhotoId = picture.id;
        flower.save().then(function(){
          res.redirect('/');
        });
      })
    });  
  });

});

module.exports = router;