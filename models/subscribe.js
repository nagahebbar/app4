const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// User Schema
const SubscribeSchema = mongoose.Schema({
    
    email: {
        type: String,
        require: true,
        lowercase: true,
        unique: true,
    },
    
});

const Subscribe = module.exports = mongoose.model('Subscribe', SubscribeSchema);