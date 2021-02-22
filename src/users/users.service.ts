import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import {v1 as uuid} from 'uuid';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAllUsers(): User[] {
        return this.users;
    }

    createUser(name: string, email: string, password: string): User {
        const user: User = {
            id: uuid(),
            name,
            email,
            password,
            status: UserStatus.ACTIVED
        };

        this.users.push(user);
        return user;
    }
}
