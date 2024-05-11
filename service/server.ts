import express from 'express';
// const bcrypt = require('bcryptjs');
import passport from 'passport';
import { Sequelize } from 'sequelize';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes';
// const Joi = require('joi');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());

// Setup ORM
const sequelize = new Sequelize('challenge', 'user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432
});


// Import the passport setup for authentication
import './src/config/passport'

// Use auth routes
app.use('/auth', authRoutes);

app.get('/protected',
    (req, res, next) => {
        console.log('protected endpoint hit');
        next();
    },
    passport.authenticate('jwt', { session: false }),
    (_req: express.Request, res: express.Response) => {
        res.json({ message: 'This is a protected endpoint' });
    }
);

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});