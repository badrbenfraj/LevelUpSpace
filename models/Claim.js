const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Claims = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    }
    
})

module.exports = mongoose.model('Claims', Claims)