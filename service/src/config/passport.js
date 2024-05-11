"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
const passport_jwt_1 = require("passport-jwt");
const userModel_1 = require("../models/userModel");
// Setup authentication strategy
passport_1.default.use(new passport_local_1.Strategy(function (username, password, done) {
    const hardcodedUsername = 'serviceUser';
    const hardcodedPassword = 'servicePassword';
    if (username === hardcodedUsername && password === hardcodedPassword) {
        // If user credentials match then return the user
        return done(null, new userModel_1.UserModel(1, hardcodedUsername));
    }
    else {
        // If the credentials are incorrect then authentication fails
        return done(null, false, { message: 'Incorrect username or password.' });
    }
}));
// Setup the Jwt strategy
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'my_jwt_secret'
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    console.log('jwt_payload', jwt_payload);
    if (jwt_payload && jwt_payload.id && jwt_payload.username) {
        done(null, new userModel_1.UserModel(jwt_payload.id, jwt_payload.username));
    }
    else {
        return done(null, false);
    }
}));
//# sourceMappingURL=passport.js.map