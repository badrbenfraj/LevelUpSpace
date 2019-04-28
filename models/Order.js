const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Orders = new Schema({
    TutorialID:{
        type: String,
        required: true
    },
    userName:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Orders', Orders)