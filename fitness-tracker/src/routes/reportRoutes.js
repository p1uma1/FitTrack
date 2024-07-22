const express = require('express');
const router = express.Router();
const { getReports, createReport, updateReport } = require('../controllers/reportController'); 
const requireAuth = require('../Middleware/auth');

router.get('/myreports', requireAuth, getReports); // Get all reports for the authenticated user
router.post('/', requireAuth, createReport); // Create a new report
router.put('/myreports', requireAuth, updateReport); // Update an existing report

module.exports = router;
