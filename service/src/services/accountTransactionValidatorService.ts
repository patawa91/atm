import moment from "moment-timezone";
import { IAccount } from "../models/account";
import { StatusCodeError } from "../models/statusCodeError";
import { AccountRepository } from "../repositories/accountRepository";
import { IAccountTransaction } from "../models/iAccountTransaction";

export class AccountTransactionValidatorService {
    constructor(private readonly accountRepository: AccountRepository) {}
    async validateWithdraw(account: IAccount | null, amount: number, timezone: string) {
        let validationMessages = [];
        const accountValidationMessage = this.validateAccount(account);

        if(accountValidationMessage) {
            validationMessages.push(accountValidationMessage);
        }

        this.throwStatusCodeError(validationMessages, 400);

        if(amount > 200) {
            validationMessages.push('Withdrawal amount cannot be more than 200');
        }

        if(amount % 5 !== 0) {
            validationMessages.push('Withdrawal amount must be a multiple of 5');
        }

        const now = moment().tz(timezone);
        const startOfDay = now.startOf('day').utc().toDate();
        const endOfDay = now.endOf('day').utc().toDate();
        const todaysTransactions = await this.accountRepository.getTransactions(account!.account_number, startOfDay, endOfDay);
        const totalAmount = todaysTransactions.reduce((total, transaction: IAccountTransaction) => total + transaction.amount, 0);

        if(totalAmount + amount > 400) {
            validationMessages.push('Withdrawal amount cannot be more than 400 per day');
        }

        if(account!.type === 'savings' || account!.type === 'checking') {
            if(account!.amount - amount < 0) {
                validationMessages.push('Insufficient funds');
            }
        }else {
            if(account!.amount + account!.credit_limit - amount < 0) {
                validationMessages.push('Insufficient funds - credit limit exceeded');
            }
        }

        this.throwStatusCodeError(validationMessages, 400);
    }

    async validateDeposit(account: IAccount | null, amount: number) {
        let validationMessages = [];
        const accountValidationMessage = this.validateAccount(account);

        if(accountValidationMessage) {
            validationMessages.push(accountValidationMessage);
        }

        this.throwStatusCodeError(validationMessages, 400);

        
    }

    private validateAccount(account: IAccount | null) {
        if(!account) {
            return 'Account not found during deposit';
        }
        return null;
    }

    private throwStatusCodeError(messages: string[], statusCode: number) {
        if(messages.length > 0) {
            throw new StatusCodeError(messages.join(', '), statusCode);
        }
    }

}