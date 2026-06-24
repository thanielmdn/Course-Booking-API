# Course Booking API

A RESTful API built with Node.js, Express.js, MongoDB, and JWT Authentication that allows users to browse courses, enroll in courses, and manage their accounts. Administrators can create and manage course offerings.

## Features

### User Features

* Register a new account
* Login using JWT Authentication
* View user profile
* Browse active courses
* Enroll in one or more courses
* View enrolled courses

### Admin Features

* Create new courses
* View all courses
* Update course information
* Archive courses
* Activate archived courses

## Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Passport.js (Google OAuth)
* Postman

---

## API Documentation

Postman Documentation:

```text
https://documenter.getpostman.com/view/53639461/2sBXwwo8VH
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/thanielmdn/Course-Booking-API.git
cd course-booking-api
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file in the root directory.

```env
PORT=4000
MONGODB_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
clientID=your_google_client_id
clientSecret=your_google_client_secret
```

### Run Application

```bash
npm start
```

or

```bash
nodemon index.js
```

Server will run on:

```text
http://localhost:4000
```

---

## Authentication

Protected routes require a JWT access token.

Example Header:

```http
Authorization: Bearer <access_token>
```

---

## API Endpoints

### User Routes

| Method | Endpoint           | Description                    |
| ------ | ------------------ | ------------------------------ |
| POST   | /users/check-email | Check email availability       |
| POST   | /users/register    | Register user                  |
| POST   | /users/login       | Login user                     |
| GET    | /users/details     | Get authenticated user profile |

---

### Course Routes

| Method | Endpoint                    | Access |
| ------ | --------------------------- | ------ |
| POST   | /courses                    | Admin  |
| GET    | /courses                    | Public |
| GET    | /courses/all                | Admin  |
| GET    | /courses/specific/:id       | Public |
| PATCH  | /courses/:courseId          | Admin  |
| PATCH  | /courses/:courseId/archive  | Admin  |
| PATCH  | /courses/:courseId/activate | Admin  |

---

### Enrollment Routes

| Method | Endpoint                     | Access             |
| ------ | ---------------------------- | ------------------ |
| POST   | /enrollments/enroll          | Authenticated User |
| GET    | /enrollments/get-enrollments | Authenticated User |

---

## Sample Course Object

```json
{
  "_id": "684fa52d123456789abcdef",
  "name": "JavaScript Basics",
  "description": "Introduction to JavaScript",
  "price": 2500,
  "isActive": true,
  "createdOn": "2026-06-24T10:00:00.000Z"
}
```

---

## Sample Enrollment Object

```json
{
  "_id": "684fa52d123456789abcdef",
  "userId": "684fa52d123456789abcdef",
  "enrolledCourses": [
    {
      "courseId": "684fa52d987654321fedcba"
    }
  ],
  "totalPrice": 2500,
  "status": "Enrolled",
  "enrolledOn": "2026-06-24T10:00:00.000Z"
}
```

---

## Project Structure

```text
course-booking-api
│
├── controllers
├── models
├── routes
├── passport
├── auth.js
├── index.js
├── package.json
└── README.md
```

---

## Future Improvements

* Course categories
* Search and filtering
* Enrollment history
* Payment integration
* Email notifications
* Unit and integration testing

---

## Author

Nathaniel Medina - Zuitt Student

Aspiring Software Developer focused on building scalable web applications using JavaScript, Node.js, Express.js, MongoDB, and Vue.js.
