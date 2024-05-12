import { Account } from "../models/account";
import { AccountTransaction } from '../models/accountTransaction'
import { IAccount } from '../models/account';

export class AccountRepository {
    async getAccountById(id: number): Promise<IAccount | null>{
        try {
            return await Account.findByPk(id) as IAccount | null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateAccountAmount(id: number, amount: number) {
        try {
            return await Account.update({ amount }, {
                where: {
                    account_number: id
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTransactionsById(id: number) {
        try {
            return await AccountTransaction.findAll({
                where: {
                    account_number: id
                }
            })
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insertTransaction(id: number, amount: number) {
        try {
            return await AccountTransaction.create({
                account_number: id,
                amount
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}