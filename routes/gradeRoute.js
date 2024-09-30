const express = require('express');
const gradeController = require('../controllers/gradeController');
const router = express.Router();

router.post('/assign-grade', gradeController.assignGrade);
router.get('/average-grade', gradeController.getAverageGrade);

module.exports = router;