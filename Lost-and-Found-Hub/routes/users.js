var express = require('express');
var router = express.Router();
var user = require('../models/user');

// Register page
router.get('/register', function(req, res) {
  res.render('users/register', { title: 'Register' });
});

// Register POST
router.post('/register', function(req, res) {
  let newUser = new user({
    username: req.body.username,
    password: req.body.password
  });

  newUser.save(function(err) {
    if (err) {
      return res.send('Error registering user.');
    }
    res.send('User registered successfully. Please <a href="/users/login">login</a>.');
  });
});

// Login page
router.get('/login', function(req, res) {
  res.render('users/login', { title: 'Login' });
});

// Login POST
router.post('/login', function(req, res) {
  let enteredUsername = req.body.username;
  let enteredPassword = req.body.password;

  user.findOne(
    { username: enteredUsername, password: enteredPassword },
    function(err, foundUser) {
      if (foundUser) {
        req.session.user = foundUser; // mark logged in
        res.redirect('/reports');     // go to reports page
      } else {
        res.send('Invalid username or password. Please try again.');
      }
    }
  );
});

// Logout
router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/users/login');
  });
});

module.exports = router;
