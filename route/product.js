const express = require("express");
const Products = require("../models/Products");
const router = express.Router();
const nodemailer=require('nodemailer')
const Orders=require("../models/Orders")
require("dotenv").config();

let transport = nodemailer.createTransport({
 service:'gmail',
  auth: {
     user:process.env.USER_NAME,
     pass: process.env.PASSWORD
  }
  
});
//Get all products from database
router.get("/api/getProducts", async (req, res) => {
   await Products.find({})
    .then((products)=>res.status(200).json(products))
    .catch((err)=>res.status(400).json(err.message));
  });
  
//Add product into database
  router.post("/api/products", (req, res) => {
    var title = req.body.title;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var extra_description = req.body.extra_description;
  
    var newProduct = Products({
      title: title,
      image: image,
      description: description,
      price: price,
      extra_description: extra_description,
    });
    newProduct.save(function (err, data) {
      if (err) {
        console.log(err, "err");
      } else {
        res.send(data);
      }
    });
  });
  
//Get individual product by ID
  router.get("/api/products/:id", (req, res) => {
    const id = req.params.id;
    Products.findOne({ _id: id })
      .then((data) => res.send(data))
      .catch((error) => res.send("Product not available"));
  });

  router.post("/makeOrder", (req, res) => {
    var username = req.body.username;
    var mobileNumber = req.body.mobileNumber;
    var address = req.body.address;
    var orderAmount = req.body.orderAmount;
    var orderDetails = req.body.orderDetails;
  
    var newOrder = Orders({
      username,
      mobileNumber,
      address,
      orderAmount,
      orderDetails,
    });
    newOrder.save(function (err, data) {
      if (err) {
        console.log(err, "err");
      } else {
        res.send(data);
      }
    });
  });

  router.post('/sendMail', function(req, res) {
		console.log('sending email..');
		const message = {
	    from: 'dummy6506@gmail.com', 
	    to: req.body.email,         
	    subject: 'Order confirmation',
	    text: `Hi ${req.body.email}, your bill amount of Rs.${req.body.orderAmount} is successful. You will receive your product within 2 weeks`
	  };
	  transport.sendMail(message, function(err, info) {
	    if (err) {
	      console.log(err)
	    } else {
        res.send("mail sent")
	      console.log('mail has sent.');
	      console.log(info);
	    }
	  });
  });
  
  module.exports = router;