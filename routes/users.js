var express = require('express');
var router = express.Router();

/* Kenil Part 2*/

/* Import the user model */
var user = require('../models/user');

/* Get users registration page. */
router.get('/register', function(req, res, next) {
  res.render('users/register', { title: 'Register' });
});

/* Post users registration page. */
router.post('/register', function(req, res, next) {
  /* Get user data */
  let newUser = new user({
    username: req.body.username,
    password: req.body.password
  });
  /* Save user data to the database */
  newUser.save(function(err) {
    if (err) {
      /* Handle registration error */
      return res.send('Error registering user.');
    }
    /* Redirect to login page after successful registration */
    res.send('User registered successfully. Please <a href="/users/login">login</a>.');
  });
});

/* Get users login page. */
router.get('/login', function(req, res, next) {
  res.render('users/login', { title: 'Login' });
});

/* Post users login page. */
router.post('/login', function(req, res, next) {
  /* Read user data */
  let enteredUsername = req.body.username;
  let enteredPassword = req.body.password;
  /* Find user in the database */
  user.findOne({ username: enteredUsername, password: enteredPassword }, function(err, user) {
    if (user) {
      /* Successful login */
      res.send('Login successful!');
    } else {
      /* Failed login */
      res.send('Invalid username or password. Please try again.');
    }
  });
});

/*Code from Part1 /*
/* 
GET users listing. 
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
*/

module.exports = router;
