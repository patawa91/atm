"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const accountController_1 = require("../controllers/accountController");
const accountService_1 = require("../services/accountService");
const accountRepository_1 = require("../repositories/accountRepository");
const router = express_1.default.Router();
const accountController = new accountController_1.AccountController(new accountService_1.AccountService(new accountRepository_1.AccountRepository()));
router.get('/:id', passport_1.default.authenticate('jwt', { session: false }), accountController.validateId, accountController.getById);
router.post('/:id/withdrawal', passport_1.default.authenticate('jwt', { session: false }), accountController.validateId, accountController.validateAmount, accountController.withdrawal);
exports.default = router;
//# sourceMappingURL=accountRoutes.js.map