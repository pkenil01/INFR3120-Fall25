var express = require('express');
var router = express.Router();
var user = require('../models/user');

// Register page
router.get('/register', function(req, res) {
  res.render('users/register', { title: 'Register' });
});

// Register POST
router.post('/register', async function(req, res) {
  try {
    let newUser = new user({
      username: req.body.username,
      password: req.body.password
    });

    // mongoose v6+ returns a promise from save(), do not pass a callback
    await newUser.save();

    res.send('User registered successfully. Please <a href="/users/login">login</a>.');
  } catch (err) {
    console.error('register error:', err);
    res.status(500).send('Error registering user.');
  }
});

// Login page
router.get('/login', function(req, res) {
  res.render('users/login', { title: 'Login' });
});

// Login POST
router.post('/login', async function(req, res) {
  try {
    const enteredUsername = req.body.username;
    const enteredPassword = req.body.password;

    // mongoose no longer accepts callbacks on findOne(), use promise/await
    const foundUser = await user.findOne({ username: enteredUsername, password: enteredPassword }).exec();

    if (foundUser) {
      req.session.user = foundUser; // mark logged in
      return res.redirect('/reports');
    }

    res.status(401).send('Invalid username or password. Please try again.');
  } catch (err) {
    console.error('login error:', err);
    res.status(500).send('error during login.');
  }
});

// Logout
router.get('/logout', function(req, res) {
  req.session.destroy(() => {
    res.redirect('/users/login');
  });
});

//Part 3
// Change password page
router.get('/change-password', function(req, res) {
  res.render('users/change-password', { title: 'Change Password' });
});

// Change password POST
router.post('/change-password', async function(req, res) {
  try {

    let foundUser = await user.findOne({
      username: req.session.user.username,
      password: req.body.oldPassword
    });

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
