// IMPORTS
// Load environment variables from a .env file into 'process.env'
// This allows you to store sensitive data securely
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");

// Import CORS
// This allows your backend API to accept requests from other origins
const cors = require("cors");

/*S43 ACTIVITY SOLUTION START*/
const userRoutes = require("./routes/user");
const courseRoutes = require("./routes/course");
/*S43 ACTIVITY SOLUTION END*/
const enrollmentRoutes = require("./routes/enrollment");

// GOOGLE LOGIN
// passport is used to handle authentication (login system)
const passport = require('passport');
// This is used to store user session data (so users stay logged in)
const session = require('express-session');
// Import the local passport configuration file
require('./passport');

// APP INITIALIZATION
const app = express();
// const port = 4000;
// Initialize dotenv and load all variables from the .env file into 'process.env'
dotenv.config();

// DATABASE CONNECTION
// process - process is the running Expres/Node.js application
// .env - environment (settings/variables)
mongoose.connect(process.env.MONGODB_STRING);

let db = mongoose.connection; 

db.on("error", console.error.bind(console, "connection error"));

mongoose.connection.once('open', () => console.log('Now connected to MongoDB Atlas.')); 

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS - is a browser security rule that controls who is allowed to access your server from another website/frontend
// Define CORS configuration options
const corsOptions = {
    // Allow requests only from this frontend
    origin: ['http://localhost:8000'],
    // Allow cookies, authorization headers, or login sessions
    credentials: true,
    // Use 200 to tell the browser it's OK to continue the request because some browsers fail if its not 200
    optionSuccessStatus: 200
}

// Apply CORS settings so the browser can access this API from allowed origins, because requests from different ports/domains are blocked by default
app.use(cors(corsOptions));

// GOOGLE LOGIN
// This allows the server to remember users between requests
app.use(session({
    // prevents tampering of session data
    secret: process.env.clientSecret,
    // Save only when session data changes (like storing user info during login)
    resave: false,
    // Session will only be created after something is stored (like user login)
    saveUninitialized: false
}));

// Initializes the passport package when the application runs
app.use(passport.initialize());
// This connects passport to express-session so user login data can be stored and retrieved from the session
app.use(passport.session());


/*S43 ACTIVITY SOLUTION START*/
app.use("/users", userRoutes);
app.use("/courses", courseRoutes);
/*S43 ACTIVITY SOLUTION END*/
app.use("/enrollments", enrollmentRoutes);


// SERVER START
if(require.main === module){
    app.listen(process.env.PORT || 3000, () => console.log(`Server running at port ${process.env.PORT || 3000}`));
}

// EXPORTS
module.exports = {app, mongoose};
