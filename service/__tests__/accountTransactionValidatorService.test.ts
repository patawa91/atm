import { AccountRepository } from "../src/repositories/accountRepository";
import { AccountTransactionValidatorService } from "../src/services/accountTransactionValidatorService";
import { IAccountTransaction } from "../src/models/iAccountTransaction";
import moment from "moment";
import MockDate from "mockdate";

jest.mock('config', () => {
    return {
        get: jest.fn((key: string) => {
            switch (key) {
                case 'withdrawal':
                    return {
                        "maxWithdrawal": 200,
                        "maxDailyWithdrawal": 400
                      };
                case 'deposit':
                    return {
                        "maxDeposit": 1000
                      };
                default:
                    return null;
            }
        }),
    };
});

describe('AccountTransactionValidatorService', () => {
    let accountTransactionValidatorService: AccountTransactionValidatorService;
    let mockAccountRepository: jest.Mocked<AccountRepository>;

    beforeEach(() => {
        mockAccountRepository = {
            getAccountByAccountNumber: jest.fn(),
            updateAccountAmount: jest.fn(),
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

        it('should produce correct start and end dates based on timezone', async () => {
            // set the current date and time to a particular date and time from new york utc 12:30 AM
            MockDate.set('2022-01-01T05:30:00Z');
        
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 5;
        
            await accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York');
        
            const now = moment.tz('America/New_York');
        
            const startOfDay = now.startOf('day').utc().toDate();
            const endOfDay = now.endOf('day').utc().toDate();
        
            expect(mockAccountRepository.getTransactions).toHaveBeenCalledWith(account.account_number, startOfDay, endOfDay, 'withdrawal');
        
            // reset the date back to current moment
            MockDate.reset();
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

        it('should throw error for savings if withdrawal amount is more than account amount', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 101;
            const expectedMessage = 'Insufficient funds';

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error for checking if withdrawal amount is more than account amount', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'checking',
                credit_limit: 0
            };
            const amount = 101;
            const expectedMessage = 'Insufficient funds';

            await expect(accountTransactionValidatorService.validateWithdraw(account, amount, 'America/New_York'))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error for credit account if withdrawal amount causes credit limit to be exceeded', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: -100,
                type: 'credit',
                credit_limit: 100
            };
            const amount = 1;
            const expectedMessage = 'Insufficient funds - credit limit exceeded';

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

        it('should throw error if deposit amount is more than 1000', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: 100,
                type: 'savings',
                credit_limit: 0
            };
            const amount = 1001;
            const expectedMessage = 'Deposit amount cannot be more than 1000';

            await expect(accountTransactionValidatorService.validateDeposit(account, amount))
            .rejects.toThrow(expectedMessage);
        });

        it('should throw error if deposit amount causes credit account to be more than zero', async () => {
            const account = {
                account_number: 1,
                name: 'test',
                amount: -100,
                type: 'credit',
                credit_limit: 100
            };
            const amount = 101;
            const expectedMessage = 'Deposit amount cannot cause credit account to be more than zero';

            await expect(accountTransactionValidatorService.validateDeposit(account, amount))
            .rejects.toThrow(expectedMessage);
        });
    });
});