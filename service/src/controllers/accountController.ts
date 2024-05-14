import express from 'express';
import { param, body, validationResult } from 'express-validator';
import { AccountService} from '../services/accountService'

interface RequestWithUser extends express.Request {
    user?: {
      accountNumber?: number;
    };
  }

export class AccountController {
    constructor(private readonly accountService: AccountService) {
        
    }

    handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        next();
    }

    validateAccountNumber = [
        param('accountNumber').isInt().withMessage('Account Number must be an integer'),
        this.handleValidationErrors   
    ];

    validateAmount = [
        body('amount')
            .exists().withMessage('Amount is required')
            .isInt({gt: 0 }).withMessage('Amount must be greater than zero'),
        this.handleValidationErrors
    ];

    validateTimezone = [
        body('timezone')
            .exists().withMessage('Timezone is required')
            .isString().withMessage('Timezone must be a string'),
        this.handleValidationErrors
    ];

    validateUserAccountNumber = 
        (req: RequestWithUser, res: express.Response, next: express.NextFunction): void => {
            const accountNumber = parseInt(req.params.accountNumber, 10);
            if (req.user && req.user.accountNumber !== accountNumber) {
                res.status(400).json({ errors: [{ msg: 'Account Number does not match the authenticated user.' }] });
            } else {
                next();
            }
        };

    getByAccountNumber = async (req: express.Request, res: express.Response) => {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        
        const account = await this.accountService.getAccountByAccountNumber(accountNumber);
        if(!account) {
            res.status(404).send('Account not found');
            return
        }
        res.json(account);
    }

    withdrawal = async (req: express.Request, res: express.Response) => {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        const amount = parseInt(req.body.amount, 10);

        await this.accountService.withdrawal(accountNumber, amount, req.body.timezone);
        res.send('Withdraw successful');
    }

    deposit = async (req: express.Request, res: express.Response) => {
        const accountNumber = parseInt(req.params.accountNumber, 10);
        const amount = parseInt(req.body.amount, 10);

        await this.accountService.deposit(accountNumber, amount);
        res.send('Deposit successful');
    }
}