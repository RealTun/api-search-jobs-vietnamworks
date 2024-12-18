const express = require('express');
const { searchJobs, findCompanyByName } = require('../controllers/api.controller');
const { login, getSummaryMark } = require('../controllers/student.controller');
const router = express.Router();

// student
router.post('/login', login);
router.get('/student/getSummaryMark', getSummaryMark);

// jobs
router.post('/jobs/search', searchJobs);
router.post('/company/search', findCompanyByName);

module.exports = router;