import moment from "moment-timezone";
import { IAccount } from "../models/account";
import { StatusCodeError } from "../models/statusCodeError";
import { AccountRepository } from "../repositories/accountRepository";
import { IAccountTransaction } from "../models/iAccountTransaction";
import config from 'config';

export class AccountTransactionValidatorService {
    constructor(private readonly accountRepository: AccountRepository) {}
    async validateWithdraw(account: IAccount | null, amount: number, timezone: string) {
        let validationMessages: string[] = [];
        this.validateAccount(account, validationMessages);

        // stop if there is account error
        this.throwStatusCodeError(validationMessages, 400);

        this.validateWithdrawAmountNotOverMax(amount, validationMessages);

        this.validateWithdrawAmountIsAMultiple(amount, validationMessages);

        await this.validateWithdrawAmountDailyMax(timezone, account, amount, validationMessages);

        this.validateWithdrawIfInsufficientFunds(account, amount, validationMessages);

        // throw previous errors if any
        this.throwStatusCodeError(validationMessages, 400);
    }

    async validateDeposit(account: IAccount | null, amount: number) {
        let validationMessages: string[] = [];
        this.validateAccount(account, validationMessages);

         // stop if there is account error
        this.throwStatusCodeError(validationMessages, 400);

        this.validateDepositAmountNotOverMax(amount, validationMessages);

        this.validateDepositCreditAmountNotOverMax(account, amount, validationMessages);

        // throw previous errors if any
        this.throwStatusCodeError(validationMessages, 400);
    }

    private validateAccount(account: IAccount | null, validationMessages: string[]) {
        if(!account) {
            validationMessages.push('Account not found during deposit');
        }
    }

    private validateWithdrawAmountNotOverMax(amount: number, validationMessages: string[]) {
        const withdrawalSettings = config.get('withdrawal') as any;
        const maxWithdrawalAmount = withdrawalSettings.maxWithdrawal as number;
        if (amount > maxWithdrawalAmount) {
            validationMessages.push('Withdrawal amount cannot be more than 200');
        }
    }

    private async validateWithdrawAmountDailyMax(timezone: string, account: IAccount | null, amount: number, validationMessages: string[]) {
        const now = moment().tz(timezone);
        const startOfDay = now.startOf('day').utc().toDate();
        const endOfDay = now.endOf('day').utc().toDate();
        const todaysTransactions = await this.accountRepository.getTransactions(account!.account_number, startOfDay, endOfDay, 'withdrawal');
        const totalAmount = todaysTransactions.reduce((total, transaction: IAccountTransaction) => total + transaction.amount, 0);

        const withdrawalSettings = config.get('withdrawal') as any;
        const maxDailyAmount = withdrawalSettings.maxDailyWithdrawal as number;
        if (totalAmount + amount > maxDailyAmount) {
            validationMessages.push('Withdrawal amount cannot be more than 400 per day');
        }
    }

    private validateWithdrawAmountIsAMultiple(amount: number, validationMessages: string[]) {
        if (amount % 5 !== 0) {
            validationMessages.push('Withdrawal amount must be a multiple of 5');
        }
    }

    private validateWithdrawIfInsufficientFunds(account: IAccount | null, amount: number, validationMessages: string[]) {
        if (account!.type === 'savings' || account!.type === 'checking') {
            if (account!.amount - amount < 0) {
                validationMessages.push('Insufficient funds');
            }
        } else {
            if (account!.amount + account!.credit_limit - amount < 0) {
                validationMessages.push('Insufficient funds - credit limit exceeded');
            }
        }
    }

    private validateDepositAmountNotOverMax(amount: number, validationMessages: string[]) {
        const depositSettings = config.get('deposit') as any;
        const maxDepositAmount = depositSettings.maxDeposit as number;
        if (amount > maxDepositAmount) {
            validationMessages.push('Deposit amount cannot be more than 1000');
        }
    }

    private validateDepositCreditAmountNotOverMax(account: IAccount | null, amount: number, validationMessages: string[]) {
        if (account!.type === 'credit' && account!.amount + amount > 0) {
            validationMessages.push('Deposit amount cannot cause credit account to be more than zero');
        }
    }

    private throwStatusCodeError(messages: string[], statusCode: number) {
        if(messages.length > 0) {
            throw new StatusCodeError(messages.join(', '), statusCode);
        }
    }

}