var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/home', function(req, res, next) {
  res.render('index', { title: 'Home Page' });
});

router.get('/reportit', function(req, res, next) {
  res.render('index', { title: 'Report it' });
});

router.get('/viewall', function(req, res, next) {
  res.render('index', { title: 'View All' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'How it Works' });
});

router.get('/contactus', function(req, res, next) {
  res.render('index', { title: 'Contact us' });
});

module.exports = router;
