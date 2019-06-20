const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    userName: {
        type: String,
        required: true,
        unique: true
    },
    profileImage: {
        type: String
    },
    joinDate: {
        type: Date,
        default: Date.now
    },
    isUser: {
        type: Boolean,
        required: true,
        default: false
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isTeacher: {
        type: Boolean,
        required: true,
        default: false
    },
    isMentor: {
        type: Boolean,
        required: true,
        default: false
    }
});

userSchema.pre('save', function (next) {
    // check if password is present and is modified.
    if (!this.isModified('password')) {
        return next();
    }
    //return the hashed password.
    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);

        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err);
            this.password = hash;
            next();
        });
    });
});
module.exports = mongoose.model('User', userSchema);