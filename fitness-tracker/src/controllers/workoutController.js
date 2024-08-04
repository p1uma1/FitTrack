const Workout = require('../models/Workout');
const requireAuth = require('../Middleware/auth');

const getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find();
    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ message: 'No workouts found' });
    }
    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const createWorkout = async (req, res) => {
  try {
    const { workoutType, name, description, imageURL } = req.body;
    if (!workoutType || !name || !description || !imageURL) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const newWorkout = new Workout({ workoutType, name, description, imageURL });
    await newWorkout.save();
    res.status(201).json(newWorkout);
  } catch (error) {
    console.error('Error creating workout:', error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const getWorkoutsbyType = async (req, res) => {
  const { type } = req.params; // Extract workout type from request parameters
  console.log('workout bt type', type);
  try {
    // Find workouts matching the specified type
    const workouts = await Workout.find({ workoutType: type });
    console.log(workouts);

    if (!workouts || workouts.length === 0) {
      return res.status(404).json({ message: 'No workouts found for this type' });
    }

    res.status(200).json(workouts);
  } catch (error) {
    console.error('Error fetching workouts by type:', error);
    console.log(error);
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


module.exports = { getWorkouts, createWorkout, getWorkoutsbyType };
