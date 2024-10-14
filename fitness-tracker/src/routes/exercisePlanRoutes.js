const express = require('express');
const { getExercisePlans, createExercisePlan, getWorkouts, deleteExercisePlan, updateExercisePlan ,getExercisePlanbyId} = require('../controllers/exercisePlanController');
const requireAuth = require('../Middleware/auth');
const router = express.Router();

router.get('/',requireAuth, getExercisePlans);
router.post('/',requireAuth, createExercisePlan);
router.get('/workouts/:exercisePlanId', requireAuth, getWorkouts);
router.delete('/:exercisePlanId',requireAuth, deleteExercisePlan);
router.put('/:exercisePlanId',requireAuth, updateExercisePlan);
router.get('/details/:exercisePlanId',requireAuth, getExercisePlanbyId);
module.exports = router;
