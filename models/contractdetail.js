const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Wallet Schema
const ContractSchema = mongoose.Schema({
    
    id: {
        type: String
    },
    caddr: {
        type: String
    },
    cabi: {
        type: String
    },
     net: {
        type: String
    },
    
});

const ContractDetail = module.exports = mongoose.model('ContractDetail', ContractSchema);

