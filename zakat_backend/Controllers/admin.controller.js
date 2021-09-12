const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const user = require('../Models/user.model');
const request = require("../Models/request.model");

router.get('/', async (req, res)=>{
  
  var arr = [];
  var givers = await user.find({type: "giver"});
  var recievers = await user.find({type: "reciever"});
  var requests = await request.find({});

  arr.push(givers);
  arr.push(recievers);
  arr.push(requests);


  res.send(arr);

});


router.get('/users', async (req, res)=>{
  
  var arr = [];
  var givers = await user.find({type: "giver"});
  var recievers = await user.find({type: "reciever"});

  arr.push(givers);
  arr.push(recievers);

  res.send(arr);

});

router.post('/update_request', async (req, res)=>{
  
  var id     = req.body.id;
  var status = req.body.status;

  request.findOneAndUpdate({_id:id}, {
                                      "status": status, 
                                  }, function (err, place) {
      res.send({
          code: "success",
          message:"Request Status Updated"
      });
  });

});


module.exports = router;
