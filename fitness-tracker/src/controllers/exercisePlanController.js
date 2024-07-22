const ExercisePlan = require('../models/ExercisePlan');
const Workout = require('../models/Workout');

const getExercisePlans = async (req, res) => {
  const userId = req.user._id;
  try {
    const plans = await ExercisePlan.find({ userId }).populate('workouts');
    console.log(plans);
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const createExercisePlan = async (req, res) => {
  console.log('create exercise');
  try {
    const { userId, name, workouts } = req.body;
    const newPlan = new ExercisePlan({ userId, name, workouts });
    await newPlan.save();
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

module.exports = { getExercisePlans, createExercisePlan };
