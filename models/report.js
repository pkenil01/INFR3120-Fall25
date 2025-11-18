let mongoose = require('mongoose');

// creating model structure for reports

let reportModel = mongoose.Schema({
    name: String,
    description: String,
    category: String,
    status: String,
    location: String,
    date: Date,
},
    {
        collection: "reports"
    }

);
module.exports = mongoose.model('Report', reportModel);