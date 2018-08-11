const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.Promise = global.Promise;

// ICO Schema
const IcodetailSchema = mongoose.Schema({
    tn: {
        type: String
    },
    ts: {
        type: String
        
    },
    decimal: {
        type: String
        
    },
    totalsupply: {
        type: String
        
    },
    rate: {
        type: String
        
    },
    preicostartdate: {
        type: String
        
    },
    preicoenddate: {
        type: String
        
    },
    icostartdate: {
        type: String
        
    },
    icoenddate: {
        type: String
        
    },
    timerenddate: {
        type: String
        
    },
    softcap: {
        type: String
        
    },
    hardcap: {
        type: String
        
    },
    walletaddr:{
     type: String
        
    },
    ownerwa:{
     type: String
        
    },
    id:{
     type: String
        
    },
    
});

const Icodetail = module.exports = mongoose.model('Icodetail', IcodetailSchema);

