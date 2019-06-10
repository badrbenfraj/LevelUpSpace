const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const messagesSchema = new Schema({
    message:{
        type: String,
        required: true
    },
    User: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    createdDate:{
        type: String,
        default: Date.now
    }
})

module.exports = mongoose.model('Messages', messagesSchema)