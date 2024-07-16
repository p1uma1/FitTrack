const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  workoutType: {type: String},
  name: { type: String, required: true },
  description: { type: String ,required: true  },
  imageURL: {type: String, required: true}
  
});

module.exports = mongoose.model('Workout', workoutSchema);