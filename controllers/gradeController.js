const gradeService = require('../services/gradeService');

const assignGrade = async (req, res) => {
    const { enrollment_id, grade } = req.body;
    try {
        const gradeResult = await gradeService.assignGradeToStudent(enrollment_id, grade);
        res.status(201).json(gradeResult);
    } catch (error) {
        res.status(500).json({
            message: 'Error assigning grade'
        });
    }
};

const getAverageGrade = async (req, res) => {
    try {
        const averageGrades = await gradeService.getAverageGradePerCourse();
        res.status(200).json(averageGrades);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving average grades'
        });
    }
};

module.exports = {
    assignGrade,
    getAverageGrade
};