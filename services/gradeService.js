const gradeDAO = require('../daos/gradeDAO');

const assignGradeToStudent = async (enrollment_id, grade) => {
    const exists = await gradeDAO.gradeExists(enrollment_id);
    if (exists) {
        throw new Error('Grade already exists for this enrollment');
    }
    return await gradeDAO.assignGrade(enrollment_id, grade);
};

const getAverageGradePerCourse = async () => {
    return await gradeDAO.getAverageGrades();
};

module.exports = {
    assignGradeToStudent,
    getAverageGradePerCourse
};