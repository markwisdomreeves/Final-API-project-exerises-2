const bcrypt = require("bcryptjs");
const User = require("../models/Users");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;



passport.serializeUser((user, done) => {
    done(null, user.id);
});


passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});


// Local Strategy
passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
        // Comparing if both emails are MATCH / If email exist
        User.findOne({ email: email })
            .then(user => {
                // But If email does not MATCH or does not exist, we will new user account
                if (!user) {
                    const newUser = new User({ email, password });
                    // Hash password before saving it in the database
                    bcrypt.genSalt(10, (err, salt) => {
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err;
                            newUser.password = hash;
                            newUser.save()
                                .then(user => {
                                    return done(null, user);
                                })
                                .catch(err => {
                                    return done(null, false, { message: err });
                                });
                        });
                    });

                    // If not that, then Return other user 
                } else {
                    // Compare Match password
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, user);
                        } else {
                            return done(null, false, { message: "Wrong password" });
                        }
                    });
                }
            })
            .catch(err => {
                return done(null, false, { message: err });
            });
    })

);


module.exports = passport;


