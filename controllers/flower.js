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
    res.redirect("/");
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

router.get('/', function(req, res) {
  var userId = res.locals.currentUser.id;
  db.flowerTaxonomy.findAll({
    include: [db.flowerPhoto]
  }).then(function(flowers) {
    res.render('all', {flowers: flowers, cloudinary, alerts: req.flash()});
  });
});

router.get('/unknown/:id', function(req, res) {
  db.flowerPhoto.find({
    where: {
      id: req.params.id
    },
    include: [db.flowerTaxonomy, db.user]
  }).then(function(photo) {
    res.render('unknown', {photo: photo, cloudinary, alerts: req.flash()});
  });
});

router.post('/unknown/:id', function(req, res) {
  var userId = res.locals.currentUser.id;
  if (res.locals.currentUser) {
    db.flowerTaxonomy.findOrCreate({
      where: {
      name: req.body.flowerType
    },
    defaults: {
      scientificName: req.body.scientificName,
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
      db.flowerPhoto.find({
        where: {
          id: req.params.id
        }
      }).then(function(photo) {
        photo.updateAttributes({
          flowerTaxonomyId: flower.id
        }).then(function() {
          res.redirect("/");
        });
      });
    });
  } else {
    req.flash("danger", "You need to be logged in to classify a flower");
  }
});

router.get('/search', function(req, res) {
  var searchTerm = req.query.searchTerm.toLowerCase();
  var searchArray = searchTerm.split(" ");
  var search = [];
  for(var i = 0; i < searchArray.length; i++) {
    var sTerm = searchArray[i];
    var s = sTerm[0].toUpperCase() + sTerm.slice(1);
    search.push(s);
  }
  searchQ = search.join(' ');

  db.flowerTaxonomy.find({
    where: {
      name: searchQ
    }
  }).then(function(flower, err) {
    if (flower) {
      res.redirect("/flower/" + searchQ)
    } else {
      res.render("error")
    }
  })
})

router.post('/flag/:id', function(req, res) {
  db.flowerPhoto.find({
    where: {
      id: req.params.id
    }
  }).then(function(photo) {
    if(photo.flags == "null") {
      photo.updateAttributes({
        flags: 1
      });
      res.sendStatus(200)
 
    } else if(photo.flags < 3) {
      var flagval = photo.flags
      photo.updateAttributes({
        flags: flagval + 1
      });
      res.sendStatus(200)
 
    } else {
      db.flowerPhoto.destroy({
        where: {
          id:req.params.id
        }
      }).then(function() {
        res.send({message: "Photo deleted!"});
      });
    }
  })
})

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
      var likes = []
      var id = []
      // For loop pushes all likes and id's of the likes for the specific flower photos on the page to arrays
      for(var i=0;i<photos.length;i++){
        likes.push(photos[i].likes)
        id.push(photos[i].id)
      }
      // mostLiked gets the index of the highest likes in the like array
      var mostLiked = likes.indexOf(Math.max.apply(Math, likes))

      // db search finds photo w/ most likes
      db.flowerPhoto.find({
        where: {
          id: id[mostLiked]
        }
      }).then(function(mostLikedPhoto) {
        res.render('taxonomy', {flower: flower, photos: photos, mostLikedPhoto: mostLikedPhoto, cloudinary, alerts: req.flash()});
      });
    });
  });
});

module.exports = router;






