import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/userModel';
import config from 'config';
import express from 'express';
import container from '../IoC/container';
import { AccountService } from '../services/accountService';

const authConfig = config.get('auth') as any;

// Setup authentication strategy
passport.use(new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async function(req: express.Request, username: string, password: string, done: Function) {
      const configUsername = authConfig.username;
      const configPassword = authConfig.password;

      if (username !== configUsername || password !== configPassword) {
        // If the credentials are incorrect then authentication fails
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      const accountService = container.resolve('accountService') as AccountService;

      const accountNumber = req.body.accountNumber;
      const account = await accountService.getAccountByAccountNumber(accountNumber);

      if (!account) {
        // No account associated with this account number
        return done(null, false, { message: 'No account associated with this account number' });
      }

      return done(null, new UserModel(accountNumber));
    }
  ));

// Setup the Jwt strategy
const opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : authConfig.jwtSecret
};

passport.use(new JwtStrategy(opts, function(jwt_payload: any, done: Function) {
  console.log('jwt_payload', jwt_payload);
    if (jwt_payload && jwt_payload.accountNumber) {
        done(null, new UserModel(jwt_payload.accountNumber));
    } else {
        return done(null, false);
    }
}));