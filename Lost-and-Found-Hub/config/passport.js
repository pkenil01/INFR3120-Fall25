// config/passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const User = require('../models/user');

// Local strategy (username + password)
passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  async function(username, password, done) {
    try {
      const found = await User.findOne({ username: username }).exec();
      if (!found) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      // NOTE: This example compares plain text passwords (as in your original code).
      // For production, replace with bcrypt.compare(password, found.password)
      if (found.password !== password) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, found);
    } catch (err) {
      return done(err);
    }
  }
));

// GOOGLE
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    callbackURL: "/users/auth/google/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.displayName || profile.emails?.[0]?.value || `google_${profile.id}`,
          googleId: profile.id
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// GITHUB
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_ID,
    clientSecret: process.env.GITHUB_SECRET,
    callbackURL: "/users/auth/github/callback"
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ githubId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.username || profile.displayName || `github_${profile.id}`,
          githubId: profile.id
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// FACEBOOK
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: "/users/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'email']
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ facebookId: profile.id });
      if (!user) {
        user = await User.create({
          username: profile.displayName || profile.emails?.[0]?.value || `facebook_${profile.id}`,
          facebookId: profile.id
        });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  }
));

// Serialize / deserialize user (stores user id in session)
passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id).exec();
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
