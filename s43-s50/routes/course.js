/*S44 ACTIVITY SOLUTION START*/
const express = require("express");
const courseController = require("../controllers/course");

// verify - authenticated user
// verifyAdmin - authenticated user is admin
const {verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Route for creating a course
// router.post("/", (req,res)=>{
//     courseController.addCourse(req.body).then(resultFromController => res.send(resultFromController));
// }); 

router.post("/", verify, verifyAdmin, courseController.addCourse);

/*S45 ACTIVITY SOLUTION START*/

// Route for retrieving all courses
router.get("/all", verify, verifyAdmin, courseController.getAllCourses); 

// Route for retrieving all active courses
router.get("/", courseController.getAllActive);

// Route for retrieving a specific course
// ":" tells Express that this part of the URL is a parameter
// A URL parameter is a variable part of URL used to pass specific data (usually an ID) to the server
// ":id" is URL parameter (dynamic value)
router.get("/specific/:id", courseController.getCourse);

/*S45 ACTIVITY SOLUTION END*/

// Route for retrieving all courses
// router.get("/all", (req,res)=>{
//     courseController.getAllCourses().then(resultFromController => res.send(resultFromController));
// }); 

/*S46 ACTIVITY SOLUTION START*/

// Route for updating a course (Admin)
router.patch("/:courseId", verify, verifyAdmin, courseController.updateCourse);

// Route to archiving a course (Admin)
router.patch("/:courseId/archive", verify, verifyAdmin, courseController.archiveCourse);

// Route to activating a course (Admin)
router.patch("/:courseId/activate", verify, verifyAdmin, courseController.activateCourse);
/* ACTIVITY SOLUTION END */

/*S46 ACTIVITY SOLUTION END*/

module.exports = router;
/*S44 ACTIVITY SOLUTION END*/