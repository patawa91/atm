import { AccountService } from '../src/services/accountService';
import { AccountRepository } from '../src/repositories/accountRepository';
import { IAccount } from '../src/models/account';
import { AccountTransactionValidatorService } from '../src/services/accountTransactionValidatorService';

describe('AccountService', () => {
    let accountService: AccountService;
    let mockAccountRepository: jest.Mocked<AccountRepository>;
    let mockaccountTransactionValidatorService: jest.Mocked<AccountTransactionValidatorService>;

    beforeEach(() => {
        mockAccountRepository = {
            getAccountByAccountNumber: jest.fn<Promise<IAccount | null>, [number]>(),
            updateAccountAmount: jest.fn(),
            getTransactions: jest.fn(),
            insertTransaction: jest.fn()
        } as jest.Mocked<AccountRepository>;

        mockaccountTransactionValidatorService = {
            validateWithdraw: jest.fn(),
            validateDeposit: jest.fn()
        } as unknown as jest.Mocked<AccountTransactionValidatorService>;
        
        accountService = new AccountService(mockAccountRepository, mockaccountTransactionValidatorService);

        const mockAccount: IAccount = {
            account_number: 1,
            name: 'test',
            amount: 100,
            type: 'savings',
            credit_limit: 0
        };
        mockAccountRepository.getAccountByAccountNumber.mockResolvedValue(mockAccount);
    });

    describe('with getAccountById', () => {
        it('should return null if account not found', async () => {
            mockAccountRepository.getAccountByAccountNumber.mockResolvedValue(null);
    
            const account = await accountService.getAccountByAccountNumber(1);
    
            expect(account).toBeNull();
        });
    
        it('should return account if account found', async () => {
            const account = await accountService.getAccountByAccountNumber(1);
    
            expect(account).not.toBeNull();
        });
    });

    describe('with withdrawal', () => {
        it('it should call transaction validator validate', async () => {
            await accountService.withdrawal(1, 10, 'America/New_York');
            expect(mockaccountTransactionValidatorService.validateWithdraw).toHaveBeenCalled();
        });

        it('it should update account amount and insert transaction', async () => {
            await accountService.withdrawal(1, 10, 'America/New_York');
    
            expect(mockAccountRepository.updateAccountAmount).toHaveBeenCalledWith(1, 90);
            expect(mockAccountRepository.insertTransaction).toHaveBeenCalledWith(1, 10, 'withdrawal');
        });
    });

    describe('with deposit', () => {
        it('it should call transaction validator validate', async () => {
            await accountService.deposit(1, 10);
            expect(mockaccountTransactionValidatorService.validateDeposit).toHaveBeenCalled();
        });

        it('it should update account amount and insert transaction', async () => {
            await accountService.deposit(1, 10);
    
            expect(mockAccountRepository.updateAccountAmount).toHaveBeenCalledWith(1, 110);
            expect(mockAccountRepository.insertTransaction).toHaveBeenCalledWith(1, 10, 'deposit');
        });
    });
});