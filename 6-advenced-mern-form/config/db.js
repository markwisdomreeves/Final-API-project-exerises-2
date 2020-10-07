require("dotenv").config();
const mongoose = require("mongoose");

// Config .env to ./config/config.env
require('dotenv').config({
    path: "./config/config.env"
})


const connectDB = async () => {
   mongoose.connect(process.env.MONGO_URL, {
       useCreateIndex: true,
       useNewUrlParser: true,
       useFindAndModify: false,
       useUnifiedTopology: true
   }, error => {
       if (error) {
          console.log("Connection to MongoDB Database has failed ", error);
       }
       console.log("Connection to MongoDB Database is successful");
   })
}


module.exports = connectDB;