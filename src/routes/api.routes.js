const express = require('express');
const { searchJobs } = require('../controllers/api.controller');
const { login, getCurrentStudent, getListMarkDetail, getSummaryMark } = require('../controllers/student.controller');
const router = express.Router();

// student
router.post('/login', login);
// router.get('/getCurrentStudent', getCurrentStudent);
// router.get('/getListMarkDetail', getListMarkDetail);
router.get('/student/getSummaryMark', getSummaryMark);

// jobs
router.get('/jobs/search', searchJobs);

module.exports = router;