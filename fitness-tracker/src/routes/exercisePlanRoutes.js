const express = require('express');
const { getExercisePlans, createExercisePlan } = require('../controllers/exercisePlanController');

const router = express.Router();

router.get('/:userId', getExercisePlans);
router.post('/', createExercisePlan);

module.exports = router;
