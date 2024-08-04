const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const reportRoutes = require('./routes/reportRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const exercisePlanRoutes = require('./routes/exercisePlanRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();
const corsOptions = {
    origin: 'http://localhost:5173', // Replace with your frontend URL
    credentials: true, // Allow credentials (cookies) to be included
  };
  

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/workouts', workoutRoutes);
app.use('/api/exercise-plans', exercisePlanRoutes);

app.get('/api/check-auth', (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    console.log('no token');
    return res.json({ isLoggedIn: false }); 
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET);
    console.log('trying');
    return res.json({ isLoggedIn: true });
  } catch (err) {
    console.log(err);
    return res.json({ isLoggedIn: false });  
  }
});
module.exports = app;
