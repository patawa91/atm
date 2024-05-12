"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('challenge', 'user', 'password', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});
//# sourceMappingURL=database.js.map