const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const lecturesSchema = new Schema({
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
    SectionID:{
        type: String
    }
})

module.exports = mongoose.model('Lecture', lecturesSchema)