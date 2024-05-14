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
    async (req: any, res: any, next: any) => {
        try {
            await accountController.getByAccountNumber(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/:accountNumber/withdrawal',
    passport.authenticate('jwt', { session: false }),
    accountController.validateAccountNumber,
    accountController.validateUserAccountNumber,
    accountController.validateAmount,
    accountController.validateTimezone,
    async (req: any, res: any, next: any) => {
        try {
            await accountController.withdrawal(req, res);
        } catch (error) {
            next(error);
        }
    }
);

router.post('/:accountNumber/deposit',
    passport.authenticate('jwt', { session: false }),
    accountController.validateAccountNumber,
    accountController.validateUserAccountNumber,
    accountController.validateAmount,
    async (req:any, res:any, next:any) => {
        try {
            await accountController.deposit(req, res);
        } catch (error) {
            next(error);
        }
    }
);

export default router;
