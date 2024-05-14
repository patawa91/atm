import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export const AccountTransaction = sequelize.define('account_transactions', {
    account_number : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        references: {
            model: 'accounts',
            key: 'account_number'
        }
    },
    amount: {
        type: DataTypes.INTEGER
    },
    type: {
        type: DataTypes.STRING
    
    }
}, {
    timestamps: true,
    underscored: true
});