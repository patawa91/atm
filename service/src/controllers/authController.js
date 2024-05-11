"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const passport_1 = __importDefault(require("passport"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res, next) => {
    passport_1.default.authenticate('local', (err, user, info) => {
        if (err) {
            console.log('Authentication error: ', err);
            return next(err);
        }
        if (!user) {
            console.log('No user found');
            return res.redirect('/login');
        }
        // user was authenticated so create and return token
        var token = jsonwebtoken_1.default.sign({ id: user.id, username: user.username, timestamp: new Date().getTime() }, 'my_jwt_secret');
        return res.json({ token: token });
    })(req, res, next);
};
exports.login = login;
//# sourceMappingURL=authController.js.map