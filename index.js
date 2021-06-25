const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();


app.use(express.json());
app.use(cors());


//Mongo DB Connection
const url = "mongodb+srv://Ramprakash:q6M36bkKwq0M2S8y@cluster0.ocdtt.mongodb.net/eShop?retryWrites=true&w=majority";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongodb connection established"))
  .catch(() => console.log("Error connecting to database"))
  
const getAllProducts=require('./route/product')
const getIndividualProduct=require('./route/product')
const insertProduct=require('./route/product')
const sendEmail=require('./route/product')

app.use('/',getAllProducts)
app.use('/',getIndividualProduct)
app.use('/',insertProduct)
app.use('/',sendEmail)


  
//Server Running at Port 5000
app.listen(5000, () => {
  console.log("Server started...");
});
