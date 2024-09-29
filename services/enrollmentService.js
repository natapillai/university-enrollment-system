const enrollmentDAO = require('../daos/enrollmentDAO');

const enrollStudentInCourse = async (student_id, course_id) => {
    return await enrollmentDAO.enrollStudent(student_id, course_id);
};

module.exports = {
    enrollStudentInCourse
};