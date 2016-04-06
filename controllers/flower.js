var express = require('express');
var multer = require('multer');
var cloudinary = require('cloudinary');
var db = require('../models');
var router = express.Router();
var upload = multer({ dest: './uploads/' });

var images = [];

router.get('/upload', function(req, res) {
  var userId = res.locals.currentUser.id;
  if (res.locals.currentUser) {
    res.render('upload', {alerts: req.flash()});
  } else {
    req.flash("danger", "You need to be logged in to access this page");
  }
});

router.post('/upload', upload.single('imgUpload'), function(req, res) {
  var userId = res.locals.currentUser.id;

  db.flowerTaxonomy.findOrCreate({
    where: {
      name: req.body.flowerType
    },
    defaults: {
      location: req.body.location.toLowerCase(),
      scientificName: req.body.scientificName.toLowerCase(),
      genus: req.body.genus.toLowerCase(),
      order: req.body.order.toLowerCase(),
      family: req.body.family.toLowerCase(),
      lowTemperature: parseFloat(req.body.lowTemp),
      highTemperature: parseFloat(req.body.highTemp),
      terrain: req.body.terrain.toLowerCase(),
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
        location: req.body.location.toLowerCase()
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

router.get('/all', function(req, res) {
  var userId = res.locals.currentUser.id;
  db.flowerTaxonomy.findAll({
    include: [db.flowerPhoto]
  }).then(function(flowers) {
    res.render('all', {flowers: flowers, cloudinary});
  });
});

router.post('/:id/like', function(req, res) {
  db.flowerPhoto.find({
    where: {
      id: req.params.id
    }
  }).then(function(photo) {
    if(photo.likes == "null") {
      photo.updateAttributes({
        likes: 1
      });
      res.sendStatus(200)
    } else {
      var likeval = photo.likes
      photo.updateAttributes({
        likes: likeval + 1
      });
      res.sendStatus(200)
    }
  });
});

router.get('/:name', function(req, res) {
  var userId = res.locals.currentUser.id;
  db.flowerTaxonomy.find({
    where: {
      name: req.params.name
    },
    include: [db.flowerPhoto]
  }).then(function(flower) {
    db.flowerPhoto.findAll({
      where: {
        flowerTaxonomyId: flower.id
      },
      include: [db.user, db.flowerTaxonomy]
    }).then(function(photos) {
      res.render('taxonomy', {flower: flower, photos: photos, cloudinary});
    });
  });
});

module.exports = router;






