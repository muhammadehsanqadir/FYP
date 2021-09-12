var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        "default": Date.now
    },
    updated_at: {
        type: Date,
        "default": Date.now
    },
}, { 
    versionKey: false 
});

const User = mongoose.model('user', userSchema);
module.exports = User;