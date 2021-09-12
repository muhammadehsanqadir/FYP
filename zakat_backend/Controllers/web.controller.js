const express = require('express');
var router       = express.Router();
var consts       = require("../utils/constants.js");

const request = require("../Models/request.model");
const donation = require("../Models/donation.model");
const user = require("../Models/user.model");
const Contact = require('../Models/contact.model.js');


async function chargeCard(name, email, amount, res){

    const finalAmount = (amount / 159.46);
    console.log("Amount: "+finalAmount.toFixed(2));

	var stripe = require('stripe')('sk_test_51J3gTgKNCvzmjW8GQMS9Vlm14UX7T0GG0TgbgDBAjTRXi4qdeH3nI1lNJuIkkqJnqncSCY34dAVUBPj9isIIrBiM00c3b8yCaF'); // TEST CARD	

	var cardInfo = {
	  "number": '4242424242424242',
	  "exp_month": "11",
	  "exp_year": "2021",
	  "cvc": "123"
	};

    try{
    	const token = await stripe.tokens.create({
            card: cardInfo,
        })

        const charge = await stripe.charges.create({
          amount: parseInt(finalAmount*100),
          currency: 'usd',
          source: token.id,
          description: 'Charged PKR '+amount+' as donation',
        }, function(err, charge) {
	        if (err) {
                if(err.type === 'StripeCardError'){
                    console.log(JSON.stringify(err, null, 2));
                    console.log({
                        code: "error",
                        message: err.raw.message,
                        error_type: err.raw.type,
                    });
                    res.send({
                        code: "error",
                        error_type: err.raw.type,
                        message: err.raw.message,
                    });
                }
	        }
			else {
                console.log({
                    code: "success",
                    message: "Payment Success",
                    charge: charge,
                });
				res.send({
	            	code: "success",
					message: "Payment Success",
					charge: charge,
				});
			}
	    });
    }
    catch(err){	
        console.log({
            code: "error",
            error_type: err.raw.type,
            message: err.raw.message,
        });
    	res.send({
			code: "error",
			error_type: err.raw.type,
			message: err.raw.message,
		});

    }
	
}

router.get('/requests', async (req, res)=>{
    try{
        var all_requests = await request.find({status: "accept"});
        res.send(all_requests);
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});

router.get('/admin_requests', async (req, res)=>{
    try{
        var all_requests = await request.find({});
        res.send(all_requests);
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});

router.post('/add_donation', async (req, res)=>{
    
    var giver_id = req.body.giver_id;
    var request_id = req.body.request_id;
    var amount = req.body.amount;

    var request_info = await request.find({_id: request_id});
    var request_ref = request_info[0];

    var giver_info = await user.find({_id: giver_id});
    var giver_ref = giver_info[0];


    var requester_info = await user.find({_id: request_ref.requester});
    var requester_ref = requester_info[0];

    var reciever_id = requester_ref.id;
    var reciever_name = requester_ref.name;
    var reciever_email = requester_ref.email;
    var reciever_contact = requester_ref.contact;

    var data = new donation();
    
    data.giver_id = giver_id;
    data.request_id = request_id;
    data.reciever_id = reciever_id;
    data.reciever_name = reciever_name;
    data.reciever_email = reciever_email;
    data.reciever_contact = reciever_contact;
    data.amount = amount;

    data.save((err, doc)=>{
        if(!err){
            chargeCard(giver_ref.name, giver_ref.email, amount, res);
            // res.send({
            //     code: "success",
            //     message: "Zakaat Donated Successfully !"
            // });
            // console.log({
            //     code: "success",
            //     message: "Zakaat Donated Successfully !"
            // });
        }
        else{
            res.send({
                code: "fail",
                message: err
            });
            console.log("ERROR: "+err);
        }
    });

});

router.get('/donation_history/:id', async (req, res)=>{
    try{
        var giver_id = req.params.id;
        var history = await donation.find({giver_id: giver_id});
        res.send(history);
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});

router.get('/receiver_history/:id', async (req, res)=>{
    try{
        var giver_id = req.params.id;
        var history = await donation.find({reciever_id: giver_id});
        res.send(history);
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});

router.post('/contact', async (req, res)=>{
    try{

        var sender_id = req.body.id;
        var name = req.body.name;
        var email = req.body.email;
        var message = req.body.message;
        var type = req.body.type;
        
        console.log("Name: "+name+"\nEmail: "+email+"\nMessage: "+message+"\nType: "+type);


        var data = new Contact();

        data.sender_id = sender_id;
        data.name = name;
        data.email = email;
        data.message = message;
        data.type = type;

        data.save();

        
        res.send({
            code: "success",
            message: "Message send successfully"
        });
        
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});

router.get('/all_contact', async (req, res)=>{
    
    try{

        const msgs = await Contact.find();
        var arr = [];
        for( var i=0; i< msgs.length; i++ ){
            var obj = {
                    name: msgs[i].name,
                    email: msgs[i].email,
                    msg: msgs[i].message,
                    user: msgs[i].type,
            }
            arr.push(obj);
        }

        res.send(arr);
        
    }
    catch (e){
        console.log({
            code: "error",
            message: e
        });
        res.send({
            code: "error",
            message: e
        });
    }
});


module.exports = router;
