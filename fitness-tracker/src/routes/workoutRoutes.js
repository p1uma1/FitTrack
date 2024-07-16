const express = require('express');
const { getWorkouts, createWorkout } = require('../controllers/workoutController');

const router = express.Router();

// Define your routes here
router.get('/', getWorkouts);
router.post('/', createWorkout);

module.exports = router;
