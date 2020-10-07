const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const passport = require("./passport/setup");
const auth = require("./routes/auth");

const app = express();
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
const PORT = 5000;


// connection to Mongodb database
const MONGODB_URI = "mongodb+srv://mark_api_4:mark12345@simple-api-four.wsrhk.mongodb.net/simple-api-four?retryWrites=true&w=majority";
mongoose.connect(MONGODB_URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true
}, error => {
    if (error) {
        console.log("Connection to mongodb database has failed", error);
    } 
    console.log("Connection to mongodb database is successful");
})


// Express Session
app.use(
    session({
        secret: "this is my secret",
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: mongoose.connection
        })
    })
);

// Passport.js Middleware
app.use(passport.initialize());
app.use(passport.session());


// All Routes
app.use("/api/auth", auth);
app.get("/", (req, res) => res.send("Hello World, Welcome to the public route page"));



app.listen(PORT, () => console.log(
    `Server is running on port ${PORT}!`
));

