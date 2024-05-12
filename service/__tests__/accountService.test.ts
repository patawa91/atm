import { AccountService } from '../src/services/accountService';
import { AccountRepository } from '../src/repositories/accountRepository';
import { Account } from '../src/models/account';
import { IAccount } from '../src/models/account';
describe('AccountService', () => {
    let accountService: AccountService;
    let mockAccountRepository: jest.Mocked<AccountRepository>;

    beforeEach(() => {
        mockAccountRepository = {
            getAccountById: jest.fn()
        } as any;
        accountService = new AccountService(mockAccountRepository);
    });

    it('should return null if account not found', async () => {
        mockAccountRepository.getAccountById.mockResolvedValue(null);

        const account = await accountService.getById(1);

        expect(account).toBeNull();
    });

    it('should return account if account found', async () => {
        const mockAccount: IAccount = {
            account_number: 1,
            name: 'test',
            amount: 100,
            type: 'savings',
            credit_limit: 0
        };
        mockAccountRepository.getAccountById.mockResolvedValue(Promise.resolve(mockAccount));

        const account = await accountService.getById(1);

        expect(account).not.toBeNull();
    });
});