import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { UserModel } from '../models/userModel';

// Setup authentication strategy
passport.use(new LocalStrategy(
    function(username: string, password: string, done: Function) {
      const hardcodedUsername = 'serviceUser';
      const hardcodedPassword = 'servicePassword';
  
      if (username === hardcodedUsername && password === hardcodedPassword) {
        // If user credentials match then return the user
        return done(null, new UserModel(1, hardcodedUsername));
      } else {
        // If the credentials are incorrect then authentication fails
        return done(null, false, { message: 'Incorrect username or password.' });
      }
    }
  ));

// Setup the Jwt strategy
const opts = {
  jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey : 'my_jwt_secret'
};

passport.use(new JwtStrategy(opts, function(jwt_payload: any, done: Function) {
  console.log('jwt_payload', jwt_payload);
    if (jwt_payload && jwt_payload.id && jwt_payload.username) {
        done(null, new UserModel(jwt_payload.id, jwt_payload.username));
    } else {
        return done(null, false);
    }
}));