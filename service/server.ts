import express from 'express';
import passport from 'passport';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import authRoutes from './src/routes/authRoutes';
import accountRoutes from './src/routes/accountRoutes'
import 'express-async-errors';
import cors from 'cors'
// Import the passport setup for authentication
import './src/config/passport'
import { StatusCodeError } from './src/models/statusCodeError';

const app = express();

app.use(cors({
  origin: 'http://localhost:8080'
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize()); 

// Use auth routes
app.use('/auth', authRoutes);

// Use account routes
app.use('/account', accountRoutes);

// Error handling middleware
app.use((err:any, req:any, res:any, next:express.NextFunction) => {
  console.error('An error occurred:', err);
  if (err instanceof StatusCodeError) {
    // handle status code error
    res.status(err.statusCode).send(err.message);
  } else {
    // handle other errors
    res.status(500).send('An unexpected error occurred');
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});