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
exports.AccountController = void 0;
const express_validator_1 = require("express-validator");
class AccountController {
    constructor(accountService) {
        this.accountService = accountService;
        this.handleValidationErrors = (req, res, next) => {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next();
        };
        this.validateId = [
            (0, express_validator_1.param)('id').isInt().withMessage('Account Id must be an integer'),
            this.handleValidationErrors
        ];
        this.validateAmount = [
            (0, express_validator_1.body)('amount')
                .exists().withMessage('Amount is required')
                .isInt({ gt: 0 }).withMessage('Amount must be greater than zero'),
            this.handleValidationErrors
        ];
        this.getById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const account = yield this.accountService.getById(id);
            if (!account) {
                res.status(404).send('Account not found');
                return;
            }
            res.json(account);
        });
        this.withdrawal = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id, 10);
            const amount = parseInt(req.body.amount, 10);
            yield this.accountService.withdrawal(id, amount);
            res.send('Withdraw successful');
        });
    }
}
exports.AccountController = AccountController;
//# sourceMappingURL=accountController.js.map