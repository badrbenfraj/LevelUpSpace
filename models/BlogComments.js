const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const BlogCommentsSchema = new Schema({
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
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