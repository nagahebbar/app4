const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// Wallet Schema
const WalletaddrSchema = mongoose.Schema({
    
    id: {
        type: String
    },
    walletaddr: {
        type: String
    },
     userid: {
        type: String
    },
    
});

const Walletaddr = module.exports = mongoose.model('Walletaddr', WalletaddrSchema);

