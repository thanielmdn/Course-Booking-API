
const User = require('../models/User');

const auth = require('../auth');

// Import the errorHandler
const { errorHandler } = require('../auth');

// Import the auth module
// This allows us to use createAccessToken() to generate JWT for a user after login
// const auth = require('../auth');

// Import bcryptjs library
// bcryptjs is used for hashing passwords to make them secure before storing in the database
// It converts plain text passwords into hashed strings that cannot be easily reversed
// This helps protect user credentials in case the database is compromised
const bcrypt = require('bcryptjs');



// Check if the email already exists
module.exports.checkEmailExists = (req, res) => {

    // includes() is built-in JS method
    // It checks if the email contains '@' symbol
    if(req.body.email.includes("@")) {

        // The result is sent back to the client via the "then" method found in the route file
        return User.find({ email : req.body.email })
        .then(result => {

            // The "find" method returns a record if a match is found
            if (result.length > 0) {

                // If a duplicate email is detected
                // status(409) indicates a conflict (data already exists)
                // Always use object in real-world apps
                return res.status(409).send({ message: "Duplicate email found" });

            // No duplicate email found
            // The user is not yet registered in the database
            } else {
                return res.status(200).send({ message: "No duplicate email found" });
            };
        })
        // .catch(err => err)
        
        .catch(error => errorHandler(error, req, res));
        
    // If @ is not included
    } else {
        // Send a response with status 400 (Bad Request)
        res.status(400).send({ message: "Invalid email format" });
    }
};

// User Registration
module.exports.registerUser = (req, res) => {

    

    // Checks if the email is in the right format
    if (!req.body.email.includes("@")){
        
        return res.status(400).send({ message: 'Invalid email format' });
        
    }
    // Checks if the mobile number has the correct number of characters
    else if (req.body.mobileNo.length !== 11){
        
        return res.status(400).send({ message: 'Mobile number is invalid' });
        
    }
    // Checks if the password has atleast 8 characters
    else if (req.body.password.length < 8) {
        
        return res.status(400).send({ message: 'Password must be atleast 8 characters long' });
        
    // If all needed requirements are achieved
    } else {

        

        let newUser = new User({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            mobileNo : req.body.mobileNo,
            // 10 is the value provided as the number of "salt" rounds that the bcrypt algorithm will run in order to encrypt the password
            password : bcrypt.hashSync(req.body.password, 10)
        })

        return newUser.save()
        
        
        .then((result) => res.status(201).send({
            message: 'User registered successfully',
            user: result
        }))
        
        
        // .catch(err => err)
        
        .catch(error => errorHandler(error, req, res));
        
    }
};

// User Login
module.exports.loginUser = (req, res) => {

    // It checks if the email contains the '@' symbol
    if(req.body.email.includes("@")) {

        // The "findOne" method returns the first record in the collection that matches the search criteria
        // We use the "findOne" method instead of the "find" method which returns all records that match the search criteria
        return User.findOne({ email : req.body.email })
        .then(result => {

            // User does not exist
            if(result == null){

                
                
                return res.status(404).send({ message: 'No email found' });
                
                

            // User exists
            } else {

                // Creates the variable "isPasswordCorrect" to return the result of comparing the login form password and the database password
                // The "compareSync" method is used to compare a non encrypted password from the login form to the encrypted password retrieved from the database and returns "true" or "false" value depending on the result
                // A good coding practice for boolean variable/constants is to use the word "is" or "are" at the beginning in the form of is+Noun
                    //example. isSingle, isDone, isAdmin, areDone, etc..
                const isPasswordCorrect = bcrypt.compareSync(req.body.password, result.password);

                // If the passwords match/result of the above code is true
                if (isPasswordCorrect) {

                    // Generate an access token
                    // Uses the "createAccessToken" method defined in the "auth.js" file
                    // Returning an object back to the client application is common practice to ensure information is properly labeled and real world examples normally return more complex information represented by objects
                    
                    return res.status(200).send({ 
                        message: 'User logged in successfully',
                        access : auth.createAccessToken(result)
                    });
                    
                // Passwords do not match
                } else {

                    
                    
                    return res.status(401).send({ message: 'Incorrect email or password' });
                    
                    
                }
            }
        })
        // .catch(err => err)
        
        .catch(error => errorHandler(error, req, res));
        
    // If '@' symbol is not included
    } else {
        // Send a response with status 400 (Bad Request)
        
        res.status(400).send({ message: 'Invalid email format' });
        
    }
}

// User Details
module.exports.getProfile = (req, res) => {
    return User.findById(req.user.id)
    .then(user => {

        
        if (!user) {
            return res.status(403).send({ message: 'User not found' });
        } else {
            user.password = "";
            // Sends a successful HTTP response (status 200)
            // status(200) indicates the request was successful
            return res.status(200).send(user);
        }
        
    })
    
    .catch(error => errorHandler(error, req, res));
    
};
