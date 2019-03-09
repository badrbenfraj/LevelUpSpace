const mongoose = require('mongoose');
const Schema = mongoose.Schema;
    
const channelSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    public: {
        type: Boolean,
        required: true
    },
    messages: {
        type: [Schema.Types.ObjectId],
        ref: "Messages"
    },
    users:{
        type: [Schema.Types.ObjectId],
        ref: "User"
    }
})

module.exports = mongoose.model('Channel', channelSchema)