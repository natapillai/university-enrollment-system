const enrollmentService = require('../services/enrollmentService');

const enrollStudent = async (req, res) => {
    const { student_id, course_id } = req.body;
    try {
        const enrollment = await enrollmentService.enrollStudentInCourse(student_id, course_id);
        res.status(201).json(enrollment);
    } catch (error) {
        res.status(500).json({
            message: 'Error enrolling student'
        });
    }
};

module.exports = {
    enrollStudent
};