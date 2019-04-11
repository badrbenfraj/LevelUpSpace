const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const sectionsSchema = new Schema({
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
    TutorialID:{
        type: String
    }
})

module.exports = mongoose.model('Section', sectionsSchema)