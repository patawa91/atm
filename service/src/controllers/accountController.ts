import express from 'express';
import { param, body, validationResult } from 'express-validator';
import { AccountService} from '../services/accountService'

export class AccountController {
    constructor(private readonly accountService: AccountService) {}

    handleValidationErrors = (req: express.Request, res: express.Response, next: express.NextFunction) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array()});
        }
        next();
    }

    validateId = [
        param('id').isInt().withMessage('Account Id must be an integer'),
        this.handleValidationErrors   
    ];

    validateAmount = [
        body('amount')
            .exists().withMessage('Amount is required')
            .isInt({gt: 0 }).withMessage('Amount must be greater than zero'),
        this.handleValidationErrors
    ]

    getById = async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id, 10);
        
        const account = await this.accountService.getById(id);
        if(!account) {
            res.status(404).send('Account not found');
            return
        }
        res.json(account);
    }

    withdrawal = async (req: express.Request, res: express.Response) => {
        const id = parseInt(req.params.id, 10);
        const amount = parseInt(req.body.amount, 10);

        await this.accountService.withdrawal(id, amount);
        res.send('Withdraw successful');
    }
}