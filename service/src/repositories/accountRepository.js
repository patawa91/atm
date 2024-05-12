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
exports.AccountRepository = void 0;
const account_1 = require("../models/account");
const accountTransaction_1 = require("../models/accountTransaction");
class AccountRepository {
    getAccountById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield account_1.Account.findByPk(id);
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    updateAccountAmount(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield account_1.Account.update({ amount }, {
                    where: {
                        account_number: id
                    }
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    getTransactionsById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield accountTransaction_1.AccountTransaction.findAll({
                    where: {
                        account_number: id
                    }
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    insertTransaction(id, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield accountTransaction_1.AccountTransaction.create({
                    account_number: id,
                    amount
                });
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
}
exports.AccountRepository = AccountRepository;
//# sourceMappingURL=accountRepository.js.map