const pool = require('../config/db');

const enrollStudent = async (student_id, course_id) => {
    const query = `
        INSERT INTO enrollments (student_id, course_id)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [student_id, course_id];
    const result = await pool.query(query, values);
    return result.rows[0];
};

module.exports = {
    enrollStudent
};