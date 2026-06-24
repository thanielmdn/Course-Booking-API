
const Course = require("../models/Course");

// Import the errorHandler
const { errorHandler } = require('../auth');

// Create a course
// module.exports.addCourse = (reqBody) => {
module.exports.addCourse = (req, res) => {

    // Creates a variable "newCourse" and instantiates a new "Course" object using the mongoose model
    // Uses the information from the request body to provide all the necessary information
    let newCourse = new Course({
        // name : reqBody.name,
        // description : reqBody.description,
        // price : reqBody.
        name : req.body.name,
        description : req.body.description,
        price : req.body.price
    });

    // Check if a course with the same name already exists in the database
    Course.findOne({name: req.body.name})
    .then(existingCourse => {
        // If a course with the same name is found
        if(existingCourse) {
            // 409 Conflict - course already exists
            return res.status(409).send({ message: 'Course already exists' })
        } else {
            // Saves the created object to our database
            
            return newCourse.save().then(result => res.status(201).send({
                success: true,
                message: 'Course added successfully',
                result: result
            }))
            
            // .catch(err => err)
            // Add res.send to send the error to client
            // .catch(err => res.send(err));
            // Invokes the errorHandler and passes the error details
            .catch(err => errorHandler(err, req, res));
        }
    })
    // Handle errors that occur while checking the database
    .catch(err => errorHandler(err, req, res));
};


// Retrieve all courses
module.exports.getAllCourses = (req, res) => {

    return Course.find({})

    .then(result => {

        if(result.length > 0) {

            return res.status(200).send(result);

        } else {

            return res.status(404).send({ message: 'No courses found' });
        }
    })
    .catch(error => errorHandler(error, req, res));

};


// Retrieve all active courses
module.exports.getAllActive = (req, res) => {

    Course.find({ isActive: true })

    .then(result => {

        if (result.length > 0) {

            return res.status(200).send(result);

        } else {

            
            return res.status(404).send({ message: 'No active courses found' })
            
        }
    })
    .catch(error => errorHandler(error, req, res));
}


// Retrieve a specific course
module.exports.getCourse = (req, res) => {

    // params is a built-in property in Express, it specifically stores URL parameters
    Course.findById(req.params.id)

    .then(course => {
        if(course) {

            return res.status(200).send(course);

        } else {
            
            return res.status(404).send({ message: 'Course not found' });
            
        }
    })
    .catch(error => errorHandler(error, req, res));
};


module.exports.updateCourse = (req, res)=>{

    let updatedCourse = {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }

    // findByIdandUpdate() finds the the document in the db and updates it automatically
    // req.body is used to retrieve data from the request body, commonly through form submission
    // req.params is used to retrieve data from the request parameters or the url
    // req.params.courseId - the id used as the reference to find the document in the db retrieved from the url
    // updatedCourse - the updates to be made in the document
    return Course.findByIdAndUpdate(req.params.courseId, updatedCourse)
    .then(course => {
        if (course) {

            res.status(200).send({ 
                success: true, 
                message: 'Course updated successfully' 
            });

        } else {

            res.status(404).send({ message: 'Course not found' });

        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.archiveCourse = (req, res) => {

    let updateActiveField = {
        isActive: false
    }

    return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
    .then(course => {
        if (course) {

            if (!course.isActive) {

                return res.status(200).send({ 
                    message: 'Course already archived',
                    course: course
                });
            }


            res.status(200).send({ 
                success: true, 
                message: 'Course archived successfully'
            });

        } else {

            res.status(404).send({ message: 'Course not found' });

        }
    })
    .catch(error => errorHandler(error, req, res));
};

module.exports.activateCourse = (req, res) => {

    let updateActiveField = {
        isActive: true
    }
    
    return Course.findByIdAndUpdate(req.params.courseId, updateActiveField)
    .then(course => {
        if (course) {

            if (course.isActive) {
  
                return res.status(200).send({ 
                    message: 'Course already activated', 
                    course: course
                });

            }



            res.status(200).send({
                success: true,
                message: 'Course activated successfully'
            });

        } else {

            res.status(404).send({ message: 'Course not found' });

        }
    })
    .catch(error => errorHandler(error, req, res));
};
