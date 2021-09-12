var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var inboxSchema = new mongoose.Schema({
	sender: {
		type: String,
        default: ""
	},
	reciever: {
		type: String,
        default: ""
	},
	message: {
		type: String,
        default: ""
	},
    status: {
		type: String,
        default: ""
	}
});

var chatSchema = new mongoose.Schema({
    user_one: {
        type: String,
        required: true
    },
    user_one_name: {
        type: String,
        required: true
    },
    user_two:{
        type: String,
        required: true
    },
    user_two_name: {
        type: String,
        required: true
    },
    inbox:{
        type: [inboxSchema],
        default: []
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

const Chat = mongoose.model('chat', chatSchema);
module.exports = Chat;