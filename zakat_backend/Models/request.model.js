var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var requestSchema = new mongoose.Schema({
    requester: {
        type: String,
        required: true
    },
    user_name:{
        type: String,
        required: true
    },
    user_email:{
        type: String,
        required: true
    },
    user_contact:{
        type: String,
        required: true
    },
    user_address:{
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    reason: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    status: {
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

const Request = mongoose.model('request', requestSchema);
module.exports = Request;