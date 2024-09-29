const pool = require('../config/db');

const assignGrade = async (enrollment_id, grade) => {
    const query = `
        INSERT INTO grades (enrollment_id, grade)
        VALUES ($1, $2)
        RETURNING *;
    `;
    const values = [enrollment_id, grade];
    const result = await pool.query(query, values);
    return result.rows[0];
};

const getAverageGrades = async () => {
    const query = `
        SELECT courses.course_name, AVG(grades.grade) AS average_grade
        FROM grades
        JOIN enrollments ON grades.enrollment_id = enrollments.enrollment_id
        JOIN courses ON enrollments.course_id = courses.course_id
        GROUP BY courses.course_name;
    `;
    const result = await pool.query(query);
    return result.rows;
};

module.exports = {
    assignGrade,
    getAverageGrades
};