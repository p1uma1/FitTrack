const ExercisePlan = require('../models/ExercisePlan');
const Workout = require('../models/Workout');

const getExercisePlans = async (req, res) => {
  try {
    const { userId } = req.user._id;
    console.log(userId);
    const plans = await ExercisePlan.find({ userId }).populate('workouts');
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const createExercisePlan = async (req, res) => {
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
