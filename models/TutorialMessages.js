const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const TutorialMessagesSchema = new Schema({
    message:{
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
    },
    TutorialID:{
        type: String
    }
})

module.exports = mongoose.model('TutorialMessages', TutorialMessagesSchema)