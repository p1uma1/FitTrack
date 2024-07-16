const User = require('../models/user');
const Report = require('../models/Report'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createInitialReports = async (userId) => {
  const reportTypes = ['kcal', 'hrs', '', '%', 'kg'];

  try {
    const promises = reportTypes
      .filter(type => type) // Filter out the empty string
      .map(async (type) => {
        try {
          const newReport = new Report({
            userId,
            type,
            data: []
          });
          await newReport.save();
          console.log(`Created initial report for type '${type}'`);
        } catch (error) {
          console.error(`Error creating report for type '${type}':`, error);
          throw error;  // Propagate the error to the main try-catch block
        }
      });

    await Promise.all(promises);
    console.log('All initial reports created successfully');
  } catch (error) {
    console.error('Error creating initial reports:', error);
    throw new Error('Failed to create initial reports');
  }
};

const createToken = (id) => {
  console.log('creating jwt');
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: '', password: '' };

  // Incorrect email
  if (err.message === 'incorrect email') {
    errors.email = 'that email is not registered';
  }

  // Incorrect password
  if (err.message === 'incorrect password') {
    errors.password = 'that password is incorrect';
  }

  // Duplicate email error
  if (err.code === 11000) {
    errors.email = 'That email is already registered';
    return errors;
  }

  // Validation errors
  if (err.message.includes('User validation failed')) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

const registerUser = async (req, res) => {
  try {
    const { email, password, age, weight, gender, height } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }
    console.log('user created');

    const newUser = new User({
      email,
      password,
      age: parseInt(age),
      weight: parseFloat(weight),
      gender,
      height: parseFloat(height),
    });

    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser);

    // Create initial reports for the new user
    await createInitialReports(savedUser._id);
    console.log('user saved');

    // Generate JWT
    const token = createToken(savedUser._id);
    console.log(token);
    res.cookie('jwt', token, { 
      httpOnly: true, 
      maxAge: maxAge * 1000,
      sameSite: 'Lax', // Helps with CSRF protection
      secure: process.env.NODE_ENV === 'production' // Set secure flag in production
    });

    res.status(201).json({ user: savedUser._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ message: 'Something went wrong', errors });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const auth = await bcrypt.compare(password, existingUser.password);
      if (auth) {
        // Generate JWT
        const token = createToken(existingUser._id);
        res.cookie('jwt', token, { 
          httpOnly: true, 
          maxAge: maxAge * 1000,
          sameSite: 'Lax', // Helps with CSRF protection
          secure: process.env.NODE_ENV === 'production' // Set secure flag in production
        });
        console.log(token);
        return res.status(200).json({ user: existingUser._id });
      } else {
        throw new Error('incorrect password');
      }
    } else {
      throw new Error('incorrect email');
    }
  } catch (error) {
    const errors = handleErrors(error);
    return res.status(400).json({ errors });
  }
};

module.exports = { registerUser, loginUser };
