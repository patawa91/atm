"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const accountService_1 = require("../src/services/accountService");
describe('AccountService', () => {
    let accountService;
    let mockAccountRepository;
    beforeEach(() => {
        mockAccountRepository = {
            getById: jest.fn()
        };
        accountService = new accountService_1.AccountService(mockAccountRepository);
    });
    it('should return null if account not found', () => __awaiter(void 0, void 0, void 0, function* () {
        mockAccountRepository.getAccountById.mockResolvedValue(null);
        const account = yield accountService.getById(1);
        expect(account).toBeNull();
    }));
    it('should return account if account found', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockAccount = {
            account_number: 1,
            name: 'test',
            amount: 100,
            type: 'savings',
            credit_limit: 0
        };
        mockAccountRepository.getAccountById.mockResolvedValue(Promise.resolve(mockAccount));
        const account = yield accountService.getById(1);
        expect(account).not.toBeNull();
    }));
});
//# sourceMappingURL=accountService.test.js.map