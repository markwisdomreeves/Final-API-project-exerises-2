const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require("cors");
const connectDB = require("./config/db");

// Routes
const authRouter = require("./routes/authRoute");


// Config .env to ./config/config.env
require('dotenv').config({
    path: "./config/config.env"
})

const app = express();

// Connection to Database
connectDB();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Config for only development
if (process.env.NODE_ENV === "development") {
    app.use(cors({
        origin: process.env.CLIENT_URL
    }))
    app.use(morgan('dev'))
    // Morgan - give information about each request
    // And Cors allows use to deal with react for localhost at a port like 3000, etc without any problem
}


// All Routes
app.use("/api", authRouter);


app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "Page not found"
    });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
})