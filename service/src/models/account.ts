import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const Account = sequelize.define('accounts', {
    account_number : {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: false
    },
    name : {
        type: DataTypes.STRING
    },
    amount: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    },
    credit_limit: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: false,
});

export interface IAccount {
    account_number: number;
    name: string;
    amount: number;
    type: string;
    credit_limit: number;
}