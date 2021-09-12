var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var archonSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
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

const Archon = mongoose.model('archon', archonSchema);
module.exports = Archon;