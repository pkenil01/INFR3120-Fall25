//Kenil Part 2

//importing mongoose
let mongoose = require('mongoose');
// creating model structure for users
let userModel = mongoose.Schema({
    username: String,
    password: String,
},
    {
        collection: "users"
    }
);
//exporting the model
module.exports = mongoose.model('User', userModel);
