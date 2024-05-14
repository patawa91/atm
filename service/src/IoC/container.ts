import { createContainer, asClass, InjectionMode } from 'awilix';
import { AccountController } from '../controllers/accountController';
import { AccountService } from '../services/accountService';
import { AccountRepository } from '../repositories/accountRepository';
import { AccountTransactionValidatorService } from '../services/accountTransactionValidatorService';

const container = createContainer({injectionMode: InjectionMode.CLASSIC});

container.register({
    accountController: asClass(AccountController).singleton(),
    accountService: asClass(AccountService).singleton(),
    accountRepository: asClass(AccountRepository).singleton(),
    accountTransactionValidatorService: asClass(AccountTransactionValidatorService).singleton()
});

export default container;