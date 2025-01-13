const User = require('../models/user');
const Report = require('../models/Report'); 
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60; // 3 days in seconds

const createInitialReports = async (userId) => {
  const reportTypes = [
    { type: 'calories burned', unit: 'kcal' },
    { type: 'sleep', unit: 'hours' },
    { type: 'BMI', unit: "N/A" },  // No unit for BMI
    { type: 'body fat rate', unit: '%' },
    { type: 'weight', unit: 'kg' }
  ];

  try {
    const promises = reportTypes.map(async ({ type, unit }) => {
      try {
        const newReport = new Report({
          userId,
          type,
          unit: unit || "",  // Only assign unit if it has a value
          data: []
        });
        await newReport.save();
        console.log(`Created initial report for type '${type}' ${unit || ''}`);
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
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: maxAge,
  });
};

const handleErrors = (err) => {
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
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({ email, password });
    const savedUser = await newUser.save();
    console.log('User registered successfully:', savedUser);

    try {
      await createInitialReports(savedUser._id);
    } catch (err) {
      console.log('Initializing reports failed:', err.message);
      return res.status(500).json({ message: 'Failed to initialize reports.' });
    }

    console.log('User and reports saved successfully');

    const token = createToken(savedUser._id);
    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: maxAge * 1000,
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production'
    });

    res.status(201).json({ user: savedUser._id });
  } catch (error) {
    const errors = handleErrors(error);
    res.status(500).json({ message: 'Something went wrong', errors });
  }
};


const loginUser = async (req, res) => {
  console.log("logging in");
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log(existingUser);
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
        console.log("incorrect password");
        throw new Error('incorrect password');
      }
    } else {
      throw new Error('incorrect email');
    }
  } catch (error) {
    const errors = handleErrors(error);
    console.log("err msg: ",errors.password);
    return res.status(400).json({ errors });
  }
};

const logout= (req,res)=>{
  res.cookie('jwt', '', { maxAge: 1 }); // Clear the JWT token
  res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = { registerUser, loginUser ,logout};
