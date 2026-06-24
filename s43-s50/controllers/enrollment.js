const Enrollment = require("../models/Enrollment");

// Import the errorHandler
const { errorHandler } = require('../auth');

// Enroll a user in one or more courses
module.exports.enroll = (req, res) => {

	console.log(req.user.id);
	console.log(req.body.enrolledCourses);

	// Check if the user is an admin
	// If true, stop the process because admins are not allowed to enroll
	if (req.user.isAdmin) {
		/*S49 ACTIVITY SOLUTION START*/
		return res.status(403).send({ message: 'Admin is forbidden' });
		/*S49 ACTIVITY SOLUTION END*/
	}

	// Create a new Enrollment document
	let newEnrollment = new Enrollment ({
		userId : req.user.id,
		enrolledCourses: req.body.enrolledCourses,
		totalPrice: req.body.totalPrice
	})

	// Save the enrollment data to the database
	return newEnrollment.save()
	.then(enrolled => {
		// 201 CREATED - resource successfully created (enrollment successful)
		/*S49 ACTIVITY SOLUTION START*/
		return res.status(201).send({
            success: true,
            message: 'Enrolled successfully'
        });
		/*S49 ACTIVITY SOLUTION END*/
	})
	// Handle any errors that occur during the save process
	.catch(error => errorHandler(error, req, res));
}

/*S47 ACTIVITY SOLUTION START*/

// Get enrollments
module.exports.getEnrollments = (req, res) => {
    return Enrollment.find({userId : req.user.id})
        .then(enrollments => {
            if (enrollments.length > 0) {
                return res.status(200).send(enrollments);
            }
            /*S49 ACTIVITY SOLUTION START*/
            return res.status(404).send({ message: 'No enrolled courses' });
            /*S49 ACTIVITY SOLUTION END*/
        })
        .catch(error => errorHandler(error, req, res));
};
/*S47 ACTIVITY SOLUTION END*/