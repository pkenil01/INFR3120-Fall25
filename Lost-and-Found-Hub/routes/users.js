// routes/users.js
var express = require('express');
var router = express.Router();
var User = require('../models/user');
const passport = require('../config/passport'); // passport instance

// Register page
router.get('/register', function(req, res) {
  res.render('users/register', { title: 'Register' });
});

// Register POST
router.post('/register', async function(req, res) {
  try {
    // NOTE: This example stores plain text passwords to match your original code.
    // For production, hash passwords with bcrypt before saving.
    let newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    await newUser.save();
    // After register, redirect to login
    res.redirect('/users/login');
  } catch (err) {
    console.error('register error:', err);
    res.status(500).send('Error registering user.');
  }
});

// Login page
router.get('/login', function(req, res) {
  res.render('users/login', { title: 'Login' });
});

// Login POST - using passport local strategy
router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/reports',
    failureRedirect: '/users/login'
  })
);

// OAuth = Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/reports');
  }
);

// OAuth = GitHub
router.get('/auth/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/reports');
  }
);

// OAuth = Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/users/login' }),
  (req, res) => {
    res.redirect('/reports');
  }
);

// Logout
router.get('/logout', function(req, res) {
  req.logout(function(err) {
    if (err) { console.error(err); }
    // destroy session if any and redirect
    req.session.destroy(() => {
      res.redirect('/users/login');
    });
  });
});

// Change password page
router.get('/change-password', function(req, res) {
  // require login
  if (!req.user) {
    return res.redirect('/users/login');
  }
  res.render('users/change-password', { title: 'Change Password' });
});

// Change password POST
router.post('/change-password', async function(req, res) {
  try {
    if (!req.user) {
      return res.redirect('/users/login');
    }
    let foundUser = await User.findOne({ username: req.user.username, password: req.body.oldPassword });
    if (!foundUser) {
      return res.send('Old password is wrong.');
    }
    foundUser.password = req.body.newPassword;
    await foundUser.save();
    res.send('Password changed!');
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).send('Error changing password.');
  }
});

module.exports = router;
