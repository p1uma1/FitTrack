const express = require('express');
const { getWorkouts, createWorkout , getWorkoutsbyType} = require('../controllers/workoutController');
const router = express.Router();

// Define your routes here
router.get('/',getWorkouts);
router.post('/', createWorkout);
router.get('/:type',getWorkoutsbyType);

module.exports = router;
