const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const tutorialsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    },
    userName:{
        type: String
    }
})

module.exports = mongoose.model('Tutorial', tutorialsSchema)