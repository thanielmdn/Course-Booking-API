// Import Mongoose
// Mongoose is used to connect and interact with MongoDB
const mongoose = require('mongoose');

// mongoose.Schema() is a constructor used to define the structure of documents
// It specifies fields and their data types
const enrollmentSchema = new mongoose.Schema({

	// Store the ID of the user who made the booking
	userId: {
		type: String,
		// This field must be provided because every enrollment belong to a user
		// "true" - means the field is REQUIRED
		// If missing, Mongoose will show the message
		required: [true, 'User ID is Required']
	},
	enrolledCourses: [
		{
			// Store the ID of the course being enrolled
			courseId: {
				type: String,
				required: [true, 'Course ID is Required']
			}
		}
	],
	// Total cost of all enrolled courses
	totalPrice: {
		type: Number,
		// Required to ensure payment/price data is always recorded
		required: [true, 'totalPrice is Required']
	},
	// Stores the date when the enrollment was created
	enrolledOn: {
		type: Date,
		default: Date.now
	},
	// Tracks the current status of the enrollment
	status: {
		type: String,
		// Default value so every new enrollments starts as enrolled
		default: 'Enrolled'
	}
});

module.exports = mongoose.model('Enrollment', enrollmentSchema);