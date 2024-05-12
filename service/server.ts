import express from 'express';
// const bcrypt = require('bcryptjs');
import passport from 'passport';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes';
import accountRoutes from './src/routes/accountRoutes'
// const Joi = require('joi');
// Import the passport setup for authentication
import './src/config/passport'

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Use auth routes
app.use('/auth', authRoutes);

// Use account routes
app.use('/account', accountRoutes);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});