"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// const bcrypt = require('bcryptjs');
const passport_1 = __importDefault(require("passport"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const authRoutes_1 = __importDefault(require("./src/routes/authRoutes"));
const accountRoutes_1 = __importDefault(require("./src/routes/accountRoutes"));
// const Joi = require('joi');
// Import the passport setup for authentication
require("./src/config/passport");
const app = (0, express_1.default)();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((0, morgan_1.default)('dev'));
app.use(passport_1.default.initialize());
// Use auth routes
app.use('/auth', authRoutes_1.default);
// Use account routes
app.use('/account', accountRoutes_1.default);
// Start server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
//# sourceMappingURL=server.js.map