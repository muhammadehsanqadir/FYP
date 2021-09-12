require("./initDB");
const express      = require('express');
var cors           = require('cors');
const favicon      = require('express-favicon');
const bodyParser   = require('body-parser');
const app          = express();
const path         = require('path');

var http           = require('http').createServer(app);
var io             = require('socket.io')(http);
const port         = 9001;

app.use(express.static(__dirname+'/assets/images'));
app.use('/assets/images', express.static(__dirname + '/assets/images'));

app.use(cors());


app.use(bodyParser.json({
  limit: '50mb',
  extended: true,
}));

app.use(bodyParser.urlencoded({
  parameterLimit: 100000,
  extended: true,
  limit: '50mb',
}));
app.use(favicon(__dirname + '/favicon.ico'));

const usersController  = require("./Controllers/user.controller");
const adminController  = require("./Controllers/admin.controller");
const webController    = require("./Controllers/web.controller");
const paymentController    = require("./Controllers/payments.controller");

app.use('/api/users', usersController);
app.use('/api/admin', adminController);
app.use('/api/web', webController);
app.use('/api/payment', paymentController);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, 'client/build')));

    app.get("*", (req, res)=>{
        res.sendFile(path.join(__dirname,'client', 'build', 'index.html'));
    });
}

io.on('connection', (socket) => {
  console.log('New user connected: '+socket.id);
  require('./Sockets/User.socket').UserSockets(socket, io);
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

http.listen(process.env.PORT || 9001, ()=>{
    console.clear();
    console.log('Server Running on Port: '+port)

});