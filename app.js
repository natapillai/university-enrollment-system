const express = require('express');
const courseRoute = require('./routes/courseRoute');
const enrollmentRoute = require('./routes/enrollmentRoute');
const gradeRoute = require('./routes/gradeRoute');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/api/courses', courseRoute);
app.use('/api/enrollments', enrollmentRoute);
app.use('/api/grades', gradeRoute);

module.exports = app;