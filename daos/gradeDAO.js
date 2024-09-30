const pool = require('../config/db');

// Checks if grade exists with respect to the enrollment_id
const gradeExists = async (enrollment_id) => {
    const query = `
        SELECT *
        FROM grades
        WHERE enrollment_id = $1
    `;
    const result = await pool.query(query, [enrollment_id]);
    return result.rows.length > 0;
};

// Assigns a grade to a student according to their enrollment_id
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

// Returns average grades for each course
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
    gradeExists,
    assignGrade,
    getAverageGrades
};