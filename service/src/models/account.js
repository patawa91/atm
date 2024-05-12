"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Account = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.Account = database_1.sequelize.define('accounts', {
    account_number: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    name: {
        type: sequelize_1.DataTypes.STRING
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER
    },
    type: {
        type: sequelize_1.DataTypes.STRING
    },
    credit_limit: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    timestamps: false,
});
//# sourceMappingURL=account.js.map