const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const BlogCommentsSchema = new Schema({
    userName:{
        type: String,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
    BlogID:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('BlogComments', BlogCommentsSchema)