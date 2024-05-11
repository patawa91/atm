import { User } from './user';

export class UserModel implements User {
    id: number;
    username: string;

    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }
}