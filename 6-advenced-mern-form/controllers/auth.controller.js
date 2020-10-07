const User = require("../models/auth.model");
const expressJwt = require("express-jwt");
const lodash = require("lodash");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
// Custom error handler to get useful error from database errors
const { errorHandler } = require("../helpers/dbErrorHandling");
// I am using sendgrid to send email and I can also use nodemail
const sendMail = require("@sendgrid/mail");
sendMail.setApiKey(process.env.MAIL_KEY);



exports.registerController = (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            errors: firstError
        });
    } else {
        User.findOne({
            email
        }).exec((err, user) => {
            // If user exists
            if (user) {
                return res.status(400).json({
                    errors: "This email is taken"
                });
            }
        });

        // But if Email does not exist, Generate the user Token
        const token = jwt.sign(
            {
                name,
                email, 
                password
            },
            process.env.JWT_ACCOUNT_ACTIVATION,
            {
                expiresIn: '15m'
            }
        );

        // And after that, We send the email template / message 
        const emailData = {
            from: process.env.EMAIL_FROM,
            to: process.env.EMAIL_TO,
            // to: email,
            subject: 'Account activation link',
            html: `
               <h1>Please Click to link to activate</h1>
               <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
               <hr />
               <p>This email contain sensitive information</p>
               <p>${process.env.CLIENT_URL}</p>
            `
        }

        sendMail.send(emailData).then(sent => {
            return res.json({
                message: `Email has been sent to ${email}`
            });
        }).catch(err => {
            return res.status(400).json({
                success: false,
                error: errorHandler(err)
            });
        });
    }   
};