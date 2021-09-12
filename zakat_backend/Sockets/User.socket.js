var mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
var consts = require("../utils/constants.js");


module.exports.UserSockets = function (socket, io) {

    socket.on('new_message', async (data, callbackFn) => {
        console.log("GOT NEW MESSAGE NOTIFICATION: "+JSON.stringify(data));
		io.emit("got_new_message", data);
        console.log("Message Emitted");
    });
   
};


