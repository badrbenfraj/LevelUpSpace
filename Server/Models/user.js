const mongoose = require ('mongoose');

const userSchema = mongoose.Schema({
    email: {
        type:String,
        required: true,
        trim: true,
        unique:1
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
})

const User= mongoose.model('user', userSchema);
module.exports(User);