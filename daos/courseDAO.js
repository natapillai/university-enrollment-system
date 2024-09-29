const pool = require('../config/db');

const getAllCourses = async () => {
    const query = `
        SELECT courses.course_name, professors.name AS professor_name
        FROM courses
        JOIN professors ON courses.professor_id = professors.professor_id
    `;
    
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    getAllCourses
};