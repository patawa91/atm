import { IAccount } from '../models/account';
import { AccountRepository } from '../repositories/accountRepository';
import { AccountTransactionValidatorService } from './accountTransactionValidatorService';

export class AccountService {
    constructor(private readonly accountRepository: AccountRepository, private readonly accountTransactionValidatorService: AccountTransactionValidatorService) {}

    async getAccountByAccountNumber(accountNumber: number): Promise<IAccount | null> {
        return await this.accountRepository.getAccountByAccountNumber(accountNumber) as IAccount | null;
    }

    async withdrawal(accountNumber: number, amount: number, timezone: string) {
        
        const account = await this.accountRepository.getAccountByAccountNumber(accountNumber);
        this.accountTransactionValidatorService.validateWithdraw(account, amount, timezone);

        const newAccountAmount = account!.amount - amount;
        
        await this.updateAccountAmount(accountNumber, newAccountAmount, amount, 'withdrawal');
    }

    async deposit(accountNumber: number, amount: number) {
        const account = await this.accountRepository.getAccountByAccountNumber(accountNumber);
        this.accountTransactionValidatorService.validateDeposit(account, amount);

        const newAccountAmount = account!.amount + amount;
        await this.updateAccountAmount(accountNumber, newAccountAmount, amount, 'deposit');
    }

    private async updateAccountAmount(accountNumber: number, newAccountAmount: number, transactionAmount: number, transactionType: 'withdrawal' | 'deposit') {
        await this.accountRepository.updateAccountAmount(accountNumber, newAccountAmount);
        await this.accountRepository.insertTransaction(accountNumber, transactionAmount, transactionType);
    }
}