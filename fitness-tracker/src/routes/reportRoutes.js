const express = require('express');
const router = express.Router();
const { getReports, createReport } = require('../controllers/reportController'); 
const requireAuth = require('../Middleware/auth');

router.get('/myreports',requireAuth, getReports); // Use getReports as middleware
router.post('/', requireAuth, createReport);    // Use createReport as middleware

module.exports = router;
