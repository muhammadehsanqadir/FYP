const express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var consts = require("../utils/constants.js");
const user = require("../Models/user.model");
const donation_request = require("../Models/request.model");
const chat = require("../Models/chat.model");
var ObjectID     = require("mongodb").ObjectID;

router.post('/', async (req, res)=>{
    
    var data        = new user();
    data.name       = req.body.name;
    data.email      = req.body.email;
    data.password   = req.body.password;
    data.contact    = req.body.contact;
    data.address    = req.body.address;
    data.type       = req.body.type;
    data.otp        = req.body.otp;
    data.status     = "unverified";

    // if( req.body.type === "reciever" ){
    //     data.status = "pending";
    // }
    // else {
    //     data.status = "active";
    // }

    var emailCheck = await user.find({email: req.body.email});

    if( emailCheck.length > 0 ){
        res.send({
            code: "error",
            message: "Email already exists"
        });
        console.log({
            code: "error",
            message: "Email already exists"
        });
    }
    else {
        data.save((err, doc)=>{
            if(!err){
                res.send({
                    code: "success",
                    message: "User Added Successfully !"
                });
                console.log({
                    code: "success",
                    message: "User Added Successfully !"
                });
            }
            else{
                res.send({
                    code: "fail",
                    message: err
                });
                console.log("ERROR: "+err);
            }
        });
    }

});

router.get('/', async (req, res)=>{
    var users = await user.find();
    res.send(users);
});

router.post('/verify_otp', async (req, res)=>{

    var user_email = req.body.email;
    var otp   = req.body.otp;

    var status = "unverified";

    const user_data = await user.find({"email":user_email});
    const user_ref = user_data[0];

    if( otp === user_ref.otp && user_ref.type === "giver" ){
        status = "active";
        user.findOneAndUpdate({email:user_email}, {
            "status": status, 
        }, function (err, place) {
            var date = Date.now();
            var key = "m2AMZ5&5";

            var year   = 3.154e+7;  // 1 Year
            var month  = 2.628e+6; // 1 Month
            var week   = 604800;  // 1 Day
            var day    = 86400;  // 1 Day
            var hour   = 3600;  // 1 Hour
            var minute = 60;   // 1 Hour
            var second = 1;   // 1 Second

            var token = jwt.sign({ email: user_email, password: user_ref.password }, key, {
                expiresIn: week // expires in 24 hours i.e 7.46496e+9 seconds
            });

            var response = {
                code: "success",
                message: "Logged in Successfully",
                id: user_ref.id,
                name: user_ref.name,
                password: user_ref.password,
                email : user_ref.email,
                contact: user_ref.contact,
                address: user_ref.address,
                type: user_ref.type,
                status: status,
                token: token,
                auth: true, 
            };
            res.status(200).send([response]);
        });
    }
    else if( otp === user_ref.otp && user_ref.type === "reciever" ){
        status = "pending";
        user.findOneAndUpdate({email:user_email}, {
            "status": status, 
        }, function (err, place) {
            var date = Date.now();
            var key = "m2AMZ5&5";

            var year   = 3.154e+7;  // 1 Year
            var month  = 2.628e+6; // 1 Month
            var week   = 604800;  // 1 Day
            var day    = 86400;  // 1 Day
            var hour   = 3600;  // 1 Hour
            var minute = 60;   // 1 Hour
            var second = 1;   // 1 Second

            var token = jwt.sign({ email: user_email, password: user_ref.password }, key, {
                expiresIn: week // expires in 24 hours i.e 7.46496e+9 seconds
            });

            var response = {
                code: "success",
                message: "Logged in Successfully",
                id: user_ref.id,
                name: user_ref.name,
                password: user_ref.password,
                email : user_ref.email,
                contact: user_ref.contact,
                address: user_ref.address,
                type: user_ref.type,
                status: status,
                token: token,
                auth: true, 
            };
            res.status(200).send([response]);
        });
    }
    else if( otp !== user_ref.otp){
        res.send([{
            code: "error",
            message:"Invalid OTP"
        }]);
    }
    


});

router.get('/:id', async (req, res)=>{
    var user_id = req.params.id;

    var users = await user.find({_id: user_id});
    res.send(users);

});

router.post('/update_status', (req, res)=>{

    var id     = req.body.id;
    var status = req.body.status;

    user.findOneAndUpdate({_id:id}, {
                                        "status": status, 
                                    }, function (err, place) {
        res.send({
            code: "success",
            message:"User Status Updated"
        });
    });


});

router.post("/delete", (req, res) => {

    var id = req.body.id;

    console.log("Deleting User...");

    user.remove( { "_id" : id } , function(err) {
        if (!err) {
                console.log(JSON.stringify({
                    code: "delete_success",
                    message: "User Deleted Successfully"
                }));
                res.send({
                    code: "delete_success",
                    message: "User Deleted Successfully"
                });
        }
        else {
                console.log(JSON.stringify({
                    code: "delete_error",
                    message: err
                }));
                res.send({
                    code: "delete_error",
                    message: err
                });
        }
    });


});

router.post('/settings', (req, res)=>{

    user_id    = req.body.id;
    user_name  = req.body.name;
    email      = req.body.email;
    password   = req.body.password;
    contact    = req.body.contact;
    address    = req.body.address;
   
    var update = {
        name: user_name,
        email: email,
        password: password,
        contact: contact,
        address: address
    };

    user.findOneAndUpdate(
                            {_id:user_id}, 
                            update,
                            function (err, place) {
        if(!err){
            res.send([{
                code: "success",
                message: "Profile Updated Successfully !"
            }]);
            console.log("User Profile Updated Successfully: ");
        }
        else{
            res.send([{
                code: "fail",
                message: err
            }]);
            console.log("ERROR: "+err);
        }
    });


});

router.post('/login', async (req, res)=>{
    
    console.log(req.body);
    var email = req.body.email;
    var password = req.body.password;

    var users = await user.find({email: email, password: password});

    if(users.length > 0){
        var date = Date.now();
        var key = "m2AMZ5&5";

        var year   = 3.154e+7;  // 1 Year
        var month  = 2.628e+6; // 1 Month
        var week   = 604800;  // 1 Day
        var day    = 86400;  // 1 Day
        var hour   = 3600;  // 1 Hour
        var minute = 60;   // 1 Hour
        var second = 1;   // 1 Second

        var token = jwt.sign({ email: email, password: password }, key, {
            expiresIn: week // expires in 24 hours i.e 7.46496e+9 seconds
        });

        var response = {
            code: "success",
            message: "Logged in Successfully",
            id: users[0].id,
            name: users[0].name,
            password: users[0].password,
            email : users[0].email,
            contact: users[0].contact,
            address: users[0].address,
            type: users[0].type,
            status: users[0].status,
            token: token,
            auth: true, 
        };

        console.log(response);
        res.status(200).send([response]);

    }
    else {
        console.log({
            code: "error",
            message: "Email or password incorrect"
        });
        res.send([
            {
                code: "error",
                message: "Email or password incorrect"
            }
        ]);
    }

});

router.post('/add_request', async (req, res)=>{
    
    try{
        
        var users = await user.find({_id: req.body.user_id});
        const user_ref = users[0];

        var data          = new donation_request();
        data.requester    = req.body.user_id;
        data.user_name    = user_ref.name;
        data.user_email   = user_ref.email;
        data.user_contact = user_ref.contact;
        data.user_address = user_ref.address;
        data.amount       = req.body.amount;
        data.reason       = req.body.reason;
        data.image        = req.body.image; 
        data.status       = "pending";


        data.save((err, doc)=>{
            if(!err){
                res.send({
                    code: "success",
                    message: "Request Added Successfully !"
                });
                console.log({
                    code: "success",
                    message: "Request Added Successfully !"
                });
            }
            else{
                res.send({
                    code: "fail",
                    message: err
                });
                console.log("ERROR: "+err);
            }
        });
    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});

router.get('/get_inbox/:id', async (req, res)=>{
    
    try{
        var user_id = req.params.id;
        console.log("Getting Inbox for: "+user_id);
        var inbox = await chat.find({ $or:[ {'user_one':user_id}, {'user_two':user_id} ] });

        res.send(inbox);

    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});

router.get('/create_inbox/:sender_id/:sender_name/:reciever_id/:reciever_name', async (req, res)=>{
    
    try{
        var sender_id = req.params.sender_id;
        var sender_name = req.params.sender_name;
        var reciever_id = req.params.reciever_id;
        var reciever_name = req.params.reciever_name;

        var checkInbox = await chat.find({ $or:[ 
                                                    { $and:[ 
                                                            {'user_one':sender_id}, 
                                                            {'user_two':reciever_id} 
                                                        ] 
                                                    }, 
                                                    { $and:[ 
                                                            {'user_one':reciever_id}, 
                                                            {'user_two':sender_id} 
                                                        ] 
                                                    } 
                                                ] 
                                        });
        if( checkInbox.length > 0 ){
            res.send({
                code: "success",
                message: "Inbox already exists"
            });
        }
        else {
            var inbox = [];
            var data           = new chat();
            data.user_one      = sender_id;
            data.user_one_name = sender_name;
            data.user_two      = reciever_id;
            data.user_two_name = reciever_name;
            data.inbox         = inbox;

            data.save((err, doc)=>{
                if(!err){
                    res.send({
                        code: "success",
                        message: "Inbox Created Successfully !"
                    });
                }
                else{
                    res.send({
                        code: "fail",
                        message: err
                    });
                    console.log("ERROR: "+err);
                }
            });
        }

    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});

router.get('/get_messages/:id', async (req, res)=>{
    
    try{
        var id = req.params.id;
        var inbox = await chat.find({'_id':id});

        res.send(inbox[0].inbox);

    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});

router.post('/add_message', async (req, res)=>{
    
    try{
        var chat_id = req.body.chat_id;
        var sender_id = req.body.sender_id;
        var reciever_id = req.body.reciever_id;
        var msg = req.body.msg;

        var message = {
            sender: sender_id,
            reciever: reciever_id,
            message: msg,
            status: "unread",
        };

        chat.findOneAndUpdate(
            {'_id':chat_id},
            { $push: { inbox: message } }, function (err, place) {
                res.send({
                    code: "success",
                    message: "Message send successfully"
                });
                console.log({
                    code: "success",
                    message: "Message send successfully"
                });
            });

    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});


router.post('/update_profile', async (req, res)=>{
    
    try{
        const id = req.body.id;
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        console.log("ID: "+id+"\nName: "+name+"\nEmail: "+email+"\nPassword: "+password);

        const update = {
            name: name,
            email: email,
            password: password
        };

        user.findOneAndUpdate(
            {"_id":id}, 
            update,
            (err, place) => {
            res.send({
                code: "success",
                message: "Profile Updated successfully"
            });
            console.log({
                code: "success",
                message: place
            });
        });

    }
    catch(error){
        console.log({
            code: "error",
            message: error
        });
        res.send({
            code: "error",
            message: error
        });
    }

});



module.exports = router;
