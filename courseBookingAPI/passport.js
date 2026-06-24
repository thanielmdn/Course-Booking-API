// Loads environment variables from the .env file
require('dotenv').config()
// Passport helps handle user login (authentication)
const passport =require("passport")
// GoogleStrategy allows users to log in using their Google account
// Strategy means login method (Google, Facebook, email)
// 'passport-google-oauth20' - library that allows Google login
// '.Strategy' - accesses a specific part of the package
const GoogleStrategy = require('passport-google-oauth20').Strategy;

// Set up Google login using passport
passport.use(new GoogleStrategy({
        // This is our app's ID from Google (tells Google who we are)
        clientID: process.env.clientID,
        // This is our app's secret key (proves our app is real)
        clientSecret: process.env.clientSecret,
        // This route brings the user back to our app after Google login
        callbackURL: "http://localhost:4000/users/google/callback",
        // passReqToCallback lets us combine Google data (email, name, etc) with our own app data during login
        passReqToCallback: true
},
// This function runs after Google login is successful
// request (req) - contains data from our app (only available if passReqToCallback is true)
// accessToken - token from Google used to access Google APIs
// refreshToken - used to get a new accessToken when it expires
// profile - user information from Google (name, email, etc.)
// done - function to pass the user data to Passport
function(request, accessToken, refreshToken, profile, done) {
        // Send the user profile to Passport (login success)
        // done - function used to finish the process and store the user in the session
        // null means no error happened during the login/authentication process
        // profile is the user information from Google
        return done(null, profile);
}
));

// Save user data into the session (so the user stays logged in)
// serializeUser is a method of passport used to save the user data into the session after login.
passport.serializeUser(function(user, done) {
done(null, user);
});

// Get user data from the session
// deserializeUser is a method of passport used to retrieve the user data from the session.
passport.deserializeUser(function(user, done) {
done(null, user);
});