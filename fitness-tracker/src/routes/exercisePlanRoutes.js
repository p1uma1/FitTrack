const express = require('express');
const { getExercisePlans, createExercisePlan } = require('../controllers/exercisePlanController');
const requireAuth = require('../Middleware/auth');
const router = express.Router();

router.get('/:userId',requireAuth, getExercisePlans);
router.post('/',requireAuth, createExercisePlan);

module.exports = router;
