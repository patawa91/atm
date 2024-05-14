import { Account } from "../models/account";
import { AccountTransaction } from '../models/accountTransaction'
import { IAccount } from '../models/account';
import moment from "moment-timezone";
import { Op } from "sequelize";
import { IAccountTransaction } from "../models/iAccountTransaction";

export class AccountRepository {
    async getAccountByAccountNumber(accountNumber: number): Promise<IAccount | null>{
        try {
            return await Account.findByPk(accountNumber) as IAccount | null;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async updateAccountAmount(accountNumber: number, amount: number) {
        try {
            return await Account.update({ amount }, {
                where: {
                    account_number: accountNumber
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getTransactions(accountNumber: number, startUtc: Date, endUtc: Date): Promise<IAccountTransaction[]> {
        try {
                const transactions = await AccountTransaction.findAll({
                    where: {
                        account_number: accountNumber,
                        created_at: {
                            [Op.between]: [startUtc, endUtc]
                        }
                    }
                });

                return transactions.map((transaction: any) => transaction.get({ plain: true })) as IAccountTransaction[];
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async insertTransaction(accountNumber: number, amount: number, type: string) {
        try {
            return await AccountTransaction.create({
                account_number: accountNumber,
                amount,
                type
            });
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

}