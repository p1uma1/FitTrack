const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {isEmail} = require('validator')
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  
  email: { type: String, required: [true, 'please enter an email'], lowercase: true, unique: true ,validate: [isEmail,'please enter a valid email']},
  password: { type: String, required: [true, 'please enter a password'], minlength:[6,'minimum password length is 6'] },

});

userSchema.pre('save',async function(next){
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password,salt);
  next();
})
const User = mongoose.model('User', userSchema);


module.exports = User;