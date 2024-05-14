import { AccountRepository } from "../src/repositories/accountRepository";
import { AccountTransactionValidatorService } from "../src/services/accountTransactionValidatorService";
import { IAccountTransaction } from "../src/models/iAccountTransaction";
describe('AccountTransactionValidatorService', () => {
    let accountTransactionValidatorService: AccountTransactionValidatorService;
    let mockAccountRepository: jest.Mocked<AccountRepository>;

    beforeEach(() => {
        mockAccountRepository = {
            getAccountByAccountNumber: jest.fn(),
            updateAccountAmount: jest.fn(),
            // getTransactions: jest.fn<Promise<IAccountTransaction[]>, [number, Date, Date]>(),
            getTransactions: jest.fn().mockResolvedValue([]),
            insertTransaction: jest.fn()
        } as jest.Mocked<AccountRepository>;
        accountTransactionValidatorService = new AccountTransactionValidatorService(mockAccountRepository);
    });

    describe('with validateWithdraw', () => {
        it('should throw error if account not found', async () => {
            const account = null;
            const amount = 10;
            const expectedMessage = 'Account not found during deposit';
            
            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error if withdrawal amount is more than 200', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 201;
            const expectedMessage = 'Withdrawal amount cannot be more than 200';

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error if withdrawal amount is more than 400 per day', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 1;
            const expectedMessage = 'Withdrawal amount cannot be more than 400 per day';

            mockAccountRepository.getTransactions.mockResolvedValue([
                { account_number: 1, amount: 200 } as IAccountTransaction,
                { account_number: 1, amount: 200 } as IAccountTransaction
            ]);

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error if withdrawal amount is not a multiple of 5', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 7;
            const expectedMessage = 'Withdrawal amount must be a multiple of 5';

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });
    });

    describe('with validateDeposit', () => {
        it('should throw error if account not found', async () => {
            const account = null;
            const amount = 10;
            const expectedMessage = 'Account not found during deposit';

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });
    });
});