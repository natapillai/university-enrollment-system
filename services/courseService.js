const courseDAO = require('../daos/courseDAO');

const listAllCourses = async () => {
    return await courseDAO.getAllCourses();
};

module.exports = {
    listAllCourses
};