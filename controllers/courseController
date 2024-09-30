const courseService = require('../services/courseService');

const listCourses = async (req, res) => {
    try {
        const courses = await courseService.listAllCourses();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({
            message: 'Error retrieving courses'
        });
    }
};

module.exports = {
    listCourses
};