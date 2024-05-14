import { IUser } from './iUser';

export class UserModel implements IUser {
    accountNumber: number;

    constructor(accountNumber: number) {
        this.accountNumber = accountNumber;
    }
}