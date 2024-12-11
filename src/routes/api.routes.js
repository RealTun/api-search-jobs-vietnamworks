const express = require('express');
const { searchJobs } = require('../controllers/api.controller');
const router = express.Router();

router.get('/jobs/search', searchJobs);

module.exports = router;