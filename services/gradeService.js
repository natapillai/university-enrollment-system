const gradeDAO = require('../daos/gradeDAO');

const assignGradeToStudent = async (enrollment_id, grade) => {
    return await gradeDAO.assignGrade(enrollment_id, grade);
};

const getAverageGradePerCourse = async () => {
    return await gradeDAO.getAverageGrades();
};

module.exports = {
    assignGradeToStudent,
    getAverageGradePerCourse
};