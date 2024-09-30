
# University Enrollment System

This project is built with Express.js and serves as an API for managing student enrollments, course scheduling, and grade tracking for a university. It allows students to enroll in courses, professors to assign grades, and administrators to generate reports of average grades per course. The backend is connected to a PostgreSQL database.

## Problem Description
You have been hired to develop a system that manages student enrollments, course scheduling, and grade tracking for a university. 
The system should allow the following:
- Students can view available courses.
- Students can enroll in courses.
- Professors can assign grades to students.
- An administrator can run a report that provides the average grade per course.

## Features

- **List Available Courses**: Retrieve a list of all available courses along with the professors teaching them.
- **Enroll Student in a Course**: Allow students to enroll in specific courses.
- **Assign Grade**: Professors can assign grades to students for the courses they are enrolled in. A student can only receive one grade per course enrollment.
- **Get Average Grade**: Administrators can retrieve a report showing the average grade for each course.

## Project Structure

```
university-enrollment-system/
│
├── config/
│   └── db.js             # Database connection setup
├── controllers/
│   └── courseController.js
│   └── enrollmentController.js
│   └── gradeController.js
├── dao/
│   └── courseDAO.js
│   └── enrollmentDAO.js
│   └── gradeDAO.js
├── services/
│   └── courseService.js
│   └── enrollmentService.js
│   └── gradeService.js
├── routes/
│   └── courseRoutes.js
│   └── enrollmentRoutes.js
│   └── gradeRoutes.js
├── app.js                # Application setup
├── server.js             # Server entry point
├── .env                  # Environment variables
├── package.json          # Project dependencies
└── README.md             # Project documentation
```

## Database Setup

The system uses PostgreSQL as its database. Here are the SQL queries to create the necessary tables.

```sql
-- Table for storing students
CREATE TABLE students (
    student_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Table for storing professors
CREATE TABLE professors (
    professor_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL
);

-- Table for storing courses
CREATE TABLE courses (
    course_id SERIAL PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    professor_id INT REFERENCES professors(professor_id)
);

-- Table for managing enrollments
CREATE TABLE enrollments (
    enrollment_id SERIAL PRIMARY KEY,
    student_id INT REFERENCES students(student_id),
    course_id INT REFERENCES courses(course_id),
    UNIQUE(student_id, course_id)
);

-- Table for storing grades
CREATE TABLE grades (
    grade_id SERIAL PRIMARY KEY,
    enrollment_id INT REFERENCES enrollments(enrollment_id),
    grade DECIMAL(5,2) CHECK(grade >= 0 AND grade <= 100)
);
```

### Insert Sample Data

```sql
-- Insert students
INSERT INTO students (name, email) 
VALUES 
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Alice Johnson', 'alice.johnson@example.com');

-- Insert professors
INSERT INTO professors (name, email) 
VALUES 
('Dr. Alan Grant', 'alan.grant@example.com'),
('Dr. Ellie Sattler', 'ellie.sattler@example.com'),
('Dr. Ian Malcolm', 'ian.malcolm@example.com');

-- Insert courses
INSERT INTO courses (course_name, professor_id) 
VALUES 
('Biology 101', 1),
('Geology 102', 2),
('Mathematics 201', 3);

-- Insert enrollments
INSERT INTO enrollments (student_id, course_id) 
VALUES 
(1, 1),
(2, 2),
(3, 3),
(1, 3);

-- Insert grades
INSERT INTO grades (enrollment_id, grade) 
VALUES 
(1, 85.5),
(2, 90.0),
(3, 78.0),
(4, 88.5);
```

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/natapillai/university-enrollment-system.git
   cd university-enrollment-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up PostgreSQL database**:
   - Ensure that PostgreSQL is running on your local machine.
   - Create the database 'university_enrollment' then using the provided SQL scripts above create the tables.

4. **Run the application (Developer Mode)**:
   ```bash
   npm run dev
   ```

5. **Run the application (Deployment Mode)**:
   ```bash
   npm run start
   ```

## Environment Variables

Create a `.env` file in the root directory with the following environment variables:

```
DATABASE_URL=postgres://username:password@localhost:5432/university_enrollment
PORT=3000
```

Make sure to replace `username`, `password`, and `localhost` with the appropriate values for your PostgreSQL setup.

## API Endpoints

### 1. List Available Courses
- **Method**: `GET`
- **URL**: `/api/courses/all-courses`
- **Description**: Get a list of all courses and the professors teaching each course.

### 2. Enroll Student in a Course
- **Method**: `POST`
- **URL**: `/api/enrollments/enroll`
- **Body**:
  ```json
  {
    "student_id": 1,
    "course_id": 2
  }
  ```

### 3. Assign Grade to a Student
- **Method**: `POST`
- **URL**: `/api/grades/assign-grade`
- **Body**:
  ```json
  {
    "enrollment_id": 1,
    "grade": 90.5
  }
  ```

### 4. Get Average Grade per Course
- **Method**: `GET`
- **URL**: `/api/grades/average-grade`
- **Description**: Get the average grade for each course.

## Testing Using Postman

1. **List Courses**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/api/courses`

2. **Enroll Student**:
   - **Method**: `POST`
   - **URL**: `http://localhost:3000/api/enroll`
   - **Body** (raw JSON):
     ```json
     {
         "student_id": 1,
         "course_id": 2
     }
     ```

3. **Assign Grade**:
   - **Method**: `POST`
   - **URL**: `http://localhost:3000/api/assign-grade`
   - **Body** (raw JSON):
     ```json
     {
         "enrollment_id": 1,
         "grade": 85.5
     }
     ```

4. **Get Average Grades**:
   - **Method**: `GET`
   - **URL**: `http://localhost:3000/api/average-grade`
