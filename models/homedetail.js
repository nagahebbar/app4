const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Home Page Schema
const HomedetailSchema = mongoose.Schema({
    
    id: {
        type: String
    },
    aus: {
        type: String
    },
    cus: {
        type: String
    },
    ln: {
        type: String
    },
    facebk: {
        type: String
    },
    twitter: {
        type: String
    },
    gplus: {
        type: String
    },
    
});

const HDetail = module.exports = mongoose.model('HDetail', HomedetailSchema);

