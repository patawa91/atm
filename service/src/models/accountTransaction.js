"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTransaction = void 0;
const sequelize_1 = require("sequelize");
const database_1 = require("../config/database");
exports.AccountTransaction = database_1.sequelize.define('account_transactions', {
    account_number: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'accounts',
            key: 'account_number'
        }
    },
    amount: {
        type: sequelize_1.DataTypes.INTEGER
    }
}, {
    timestamps: true,
    underscored: true
});
//# sourceMappingURL=accountTransaction.js.map