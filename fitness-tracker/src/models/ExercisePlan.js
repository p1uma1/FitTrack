const mongoose = require('mongoose');

const exercisePlanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  workouts: [
    {
      sets: { type: Number, required: true },
      reps: { type: Number, required: true },
      workout: { type: mongoose.Schema.Types.ObjectId, ref: 'Workout', required: true }
    }
  ],
  createdAt: { type: Date, default: Date.now }
});


module.exports = mongoose.model('ExercisePlan', exercisePlanSchema);