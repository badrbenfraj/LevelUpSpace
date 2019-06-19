const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const Blogs = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
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
    image:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        default: Date.now
    },
})

module.exports = mongoose.model('Blogs', Blogs)