import express, { Router } from 'express';
import passport from 'passport';
import { AccountController } from '../controllers/accountController';
import { AccountService } from '../services/accountService';
import { AccountRepository } from '../repositories/accountRepository';
const router: Router = express.Router();
const accountController = new AccountController(new AccountService(new AccountRepository()));

router.get('/:id',
    passport.authenticate('jwt', { session: false }),
    accountController.validateId,
    accountController.getById
);

router.post('/:id/withdrawal',
    passport.authenticate('jwt', { session: false }),
    accountController.validateId,
    accountController.validateAmount,
    accountController.withdrawal
);

export default router;
