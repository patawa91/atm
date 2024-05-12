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
exports.AccountService = void 0;
class AccountService {
    constructor(accountRepository) {
        this.accountRepository = accountRepository;
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.accountRepository.getAccountById(id);
        });
    }
    withdrawal(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            const account = yield this.accountRepository.getAccountById(id);
            // call validation
            // move to validator
            if (!account) {
                throw new Error('Account not found during withdraw');
            }
            const newAccountAmout = account.amount - amount;
            yield this.accountRepository.updateAccountAmount(id, newAccountAmout);
        });
    }
}
exports.AccountService = AccountService;
//# sourceMappingURL=accountService.js.map