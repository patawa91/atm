import express, { Router } from 'express';
import passport from 'passport';
import container from '../IoC/container';
import { AccountController } from '../controllers/accountController';

const router: Router = express.Router();
const accountController = container.resolve('accountController') as AccountController;

router.get('/:accountNumber',
    passport.authenticate('jwt', { session: false }),
    accountController.validateAccountNumber,
    accountController.validateUserAccountNumber,
    accountController.getByAccountNumber
);

router.post('/:accountNumber/withdrawal',
    passport.authenticate('jwt', { session: false }),
    accountController.validateAccountNumber,
    accountController.validateUserAccountNumber,
    accountController.validateAmount,
    accountController.validateTimezone,
    accountController.withdrawal
);

router.post('/:accountNumber/deposit',
    passport.authenticate('jwt', { session: false }),
    accountController.validateAccountNumber,
    accountController.validateUserAccountNumber,
    accountController.validateAmount,
    accountController.deposit
);

export default router;
