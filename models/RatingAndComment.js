const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const RatingAndCommentSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    TutorialID:{
        type: String,
        required: true
    },
    rating:{
        type: Number,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('RatingAndComment', RatingAndCommentSchema)