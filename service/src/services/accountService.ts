import { AccountRepository } from '../repositories/accountRepository';

export class AccountService {
    constructor(private readonly accountRepository: AccountRepository) {}

    async getById(id: number) {
        return await this.accountRepository.getAccountById(id);
    }

    async withdrawal(id: number, amount: number) {
        
        const account = await this.accountRepository.getAccountById(id);
        // call validation
        // move to validator
        if(!account) {
            throw new Error('Account not found during withdrawal');
        }

        const newAccountAmout = account.amount - amount;
        await this.accountRepository.updateAccountAmount(id, newAccountAmout);
        await this.accountRepository.insertTransaction(id, amount);
    }
}