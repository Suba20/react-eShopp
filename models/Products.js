const mongoose = require("mongoose");
 
let productsSchema = new mongoose.Schema({
  title: { type: String },
  image: { type: String },
  description: { type: String },
  date:{type:Date,default:Date.now()},
  price: { type: Number },
  extra_description: {
    type: Object,
    properties: {
      desc1: String,
      desc2: String,
    },
  },
});
 
let Products=mongoose.model('products',productsSchema);
 
module.exports=Products;