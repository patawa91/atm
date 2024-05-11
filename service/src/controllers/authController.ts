import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/user';

export const login = (req : Request, res: Response, next: NextFunction): void => {
    passport.authenticate('local', (err: Error, user: User, info: any) => {
        if (err) {
            console.log('Authentication error: ', err);
             return next(err);
        }
        if (!user) { 
            console.log('No user found');
            return res.redirect('/login');
        }

        // user was authenticated so create and return token
        var token = jwt.sign({ id: user.id, username: user.username, timestamp: new Date().getTime() }, 'my_jwt_secret');
        return res.json({ token: token });
    })(req, res, next);
};