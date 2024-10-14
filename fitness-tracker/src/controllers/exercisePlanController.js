const ExercisePlan = require('../models/ExercisePlan');
const Workout = require('../models/Workout');

const getExercisePlans = async (req, res) => {
  console.log('getExercise plans');
  const userId = req.user._id;
  try {
    const plans = await ExercisePlan.find({ userId }).populate('workouts');
    console.log(plans)
    res.status(200).json(plans);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};



const getExercisePlanbyId = async (req, res) => {
  const { exercisePlanId } = req.params;

  try {
    const exercisePlan = await ExercisePlan.findById(exercisePlanId);
    if (!exercisePlan) {
      console.log('failed');
      return res.status(404).json({ message: 'Exercise plan not found' });
    }
    res.status(200).json(exercisePlan);
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

const deleteExercisePlan = async (req, res) => {
  try {
    const { exercisePlanId } = req.params;
    const deletedPlan = await ExercisePlan.findByIdAndDelete(exercisePlanId);
    if (!deletedPlan) {
      return res.status(404).json({ message: 'Exercise plan not found' });
    }
    res.status(200).json({ message: 'Deleted the plan' });
  } catch (error) {
 
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const getWorkouts = async (req, res) => {
  const { exercisePlanId } = req.params;

  try {
    const exercisePlan = await ExercisePlan.findById(exercisePlanId).populate('workouts.workout');
    if (!exercisePlan) {
      return res.status(404).json({ message: 'Exercise plan not found' });
    }

    res.status(200).json(exercisePlan.workouts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};

const updateExercisePlan = async (req, res) => {
  try {
    const { userId, name, workouts } = req.body;
    const { exercisePlanId } = req.params;
    const existingPlan =await ExercisePlan.findByIdAndUpdate(exercisePlanId,{ userId, name, workouts })
    await existingPlan.save();
    res.status(201).json({message: 'Updated successfully'});
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error });
  }
};


module.exports = { getExercisePlans, createExercisePlan, getWorkouts ,deleteExercisePlan, updateExercisePlan, getExercisePlanbyId};
