var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var donationSchema = new mongoose.Schema({
    giver_id: {
        type: String,
        required: true
    },
    request_id:{
        type: String,
        required: true
    },
    reciever_id:{
        type: String,
        required: true
    },
    reciever_name:{
        type: String,
        required: true
    },
    reciever_email:{
        type: String,
        required: true
    },
    reciever_contact:{
        type: String,
        required: true
    },
    amount:{
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

const Donation = mongoose.model('donation', donationSchema);
module.exports = Donation;