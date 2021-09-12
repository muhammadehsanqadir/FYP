const express = require('express');
var router = express.Router();


async function chargeCard(name, email, amount, res){


	var stripe = require('stripe')('sk_test_51J3gTgKNCvzmjW8GQMS9Vlm14UX7T0GG0TgbgDBAjTRXi4qdeH3nI1lNJuIkkqJnqncSCY34dAVUBPj9isIIrBiM00c3b8yCaF');// TEST CARD	

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
          amount: amount * 100,
          currency: 'aud',
          source: token.id,
          description: 'Charged PKR '+amount+' as donation',
        }, function(err, charge) {
	        if (err && err.type === 'StripeCardError') {
	            console.log(JSON.stringify(err, null, 2));
	            res.send({
	            	code: "error",
					error_type: err.raw.type,
					message: err.raw.message,
				});
	        }
			else {
				res.send({
	            	code: "success",
					message: "Payment Success",
					charge: charge,
				});
			}
	    });
    }
    catch(err){	

    	res.send({
			code: "error",
			error_type: err.raw.type,
			message: err.raw.message,
		});

    }
	
}

async function getDetails(token, res){

	try{

		const details = await stripe.tokens.retrieve(token);

		res.send({
			code: "success",
			details: details
		});

	}
	catch(err){
		res.send({
			code: "error",
			message: err
		});
	}

}

router.get('/', (req, res)=> {

	var amount = req.query.amount;
	var name   = req.query.name;
	var email  = req.query.email;

	chargeCard(name, email, amount, res);
   

});


router.get('/details/:token', (req, res)=> {

	var token = req.params.token;
	
	getDetails(token, res);
   

});


module.exports = router;