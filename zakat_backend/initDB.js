var mongo   = require('mongoose');
// var dbURL = "mongodb+srv://zakaat:m2AMZ5&5@zakaat.xoodj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
var dbURL = "mongodb://127.0.0.1:27017/zakat";
var options = {
    dbName: "zakaat",
    user: "zakaat",
    pass: "m2AMZ5&5",
    useUnifiedTopology: true,
    useNewUrlParser: true
}
mongo.connect(dbURL, { useNewUrlParser: true });

mongo.connection.on('connected', ()=>{
    console.clear();
    console.log('MongoDB Connected');
});

mongo.connection.on('error', (err)=>{
    console.clear();
});

mongo.connection.on('disconnected', ()=>{
    console.clear();
    console.log('MongoDB Disconnected');
});

process.on('SIGINT', ()=>{
    mongo.connection.close(()=>{
        console.clear();
        console.log('MongoDB Disconnected');
    });
    process.exit(0);
});