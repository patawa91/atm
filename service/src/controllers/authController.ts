import passport from 'passport';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/iUser';
import config from 'config';

const authConfig = config.get('auth') as any;

export const login = (req : Request, res: Response, next: NextFunction): void => {
    passport.authenticate('local', (err: Error, user: IUser, info: any) => {
        if (err) {
            console.log('Authentication error: ', err);
             return next(err);
        }
        if (!user) { 
            console.log('No user found');
            return res.status(401).json({ message: 'Authentication failed' });
        }

        // user was authenticated so create and return token
        var token = jwt.sign({ accountNumber: user.accountNumber, timestamp: new Date().getTime() }, authConfig.jwtSecret);
        return res.json({ token: token });
    })(req, res, next);
};