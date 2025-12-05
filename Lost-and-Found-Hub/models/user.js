// models/user.js
let mongoose = require('mongoose');

let userModel = mongoose.Schema({
  username: String,
  password: String,
  // OAuth provider IDs
  googleId: { type: String, default: null },
  githubId: { type: String, default: null },
  facebookId: { type: String, default: null }
}, { collection: "users" });

module.exports = mongoose.model('User', userModel);
