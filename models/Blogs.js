const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Blogs = new Schema({
    userName:{
        type: String,
        required: true
    },
    title:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    subject:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    },
})

module.exports = mongoose.model('Blogs', Blogs)