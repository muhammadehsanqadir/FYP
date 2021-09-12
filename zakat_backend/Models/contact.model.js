var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var contactSchema = new mongoose.Schema({
    sender_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    message:{
        type: String,
        required: true
    },
    type:{
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

const Contact = mongoose.model('contact', contactSchema);
module.exports = Contact;