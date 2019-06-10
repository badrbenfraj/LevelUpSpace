const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CampSchema = new Schema({
    CampName: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    createdDate: {
        type: String,
        default: Date.now
    },
    DateAndTime: {
        type: String,
        required: true
    },
    Mentor: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }

})

module.exports = mongoose.model('Camp', CampSchema)