const express = require('express');
const enrollmentController = require('../controllers/enrollment');
const auth = require("../auth");

const {verify} = auth;

const router = express.Router();

// Route to enroll user to course
router.post('/enroll', verify, enrollmentController.enroll);

/*S47 ACTIVITY SOLUTION START*/
//[SECTION] Route to get the user's enrollements array
router.get('/get-enrollments', verify, enrollmentController.getEnrollments);
/*S47 ACTIVITY SOLUTION END*/

module.exports = router;