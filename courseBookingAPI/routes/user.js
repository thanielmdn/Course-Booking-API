/*S43 ACTIVITY SOLUTION START*/
const express = require('express');
const userController = require('../controllers/user');

// GOOGLE LOGIN
const passport = require('passport');
// Import the auth module and extract the verify middleware function
// verify will be used to authenticate requests using JWT
const { verify, isLoggedIn } = require("../auth");

const router = express.Router();

/*S45 ACTIVITY SOLUTION START*/
router.post("/check-email", userController.checkEmailExists);

router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

router.get("/details", verify, userController.getProfile);

/*S45 ACTIVITY SOLUTION END*/

/*S44 ACTIVITY SOLUTION START*/
// Check if the email already exists
// router.post("/check-email", (req, res) => {
//     userController.checkEmailExists(req.body).then(resultFromController => res.send(resultFromController));
// });
/*S44 ACTIVITY SOLUTION END*/

// User Registration
// router.post("/register", (req, res) => {
//     userController.registerUser(req.body).then(resultFromController => res.send(resultFromController));
// })

// User Login
// router.post("/login", (req, res) => {
//     userController.loginUser(req.body).then(resultFromController => res.send(resultFromController));
// })

// User Details
// verify is a middleware that runs before the route handler
// It checks if a valid JWT is provided in the request headers
// If valid, it attaches decoded user data to req.user and allows access
// If invalid or missing, it blocks the request and sends an error response
// router.get("/details", verify, (req, res) => {

//     console.log("result from details route:");
//     console.log(req.user);

//     userController.getProfile(req.user.id).then(resultFromController => res.send(resultFromController));
// })

// GOOGLE LOGIN

// Google Auth consent screen route
// Route for initiating the Google OAuth consent screen
router.get('/google',
    passport.authenticate('google', {
            scope:
                ['email', 'profile']
        }
));

// Call back route
// This route brings the user back to our app after Google login
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/users/failed',
    }),
    function (req, res) {
        res.redirect('/users/success')

    }
);

// failed route if the authentication fails
router.get("/failed", (req, res) => {
    console.log('User is not authenticated');
    res.send("Failed")
})

// Success route if the authentication is successful
router.get("/success",isLoggedIn, (req, res) => {
    console.log('You are logged in');
    res.send(`Welcome ${req.user.displayName}`)
})

// Route that logs out the authenticated user  
router.get("/logout", (req, res) => {
	// destroy - remove stored user data
    req.session.destroy((err) => {
        if (err) {
            console.log('Error while destroying session:', err);
        } else {
            req.logout(() => {
                console.log('You are logged out');
                res.redirect('/');
            });
        }
    });
});

module.exports = router;
/*S43 ACTIVITY SOLUTION END*/