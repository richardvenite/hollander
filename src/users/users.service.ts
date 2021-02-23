import { Injectable } from '@nestjs/common';
import { User, UserStatus } from './user.model';
import {v1 as uuid} from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';

@Injectable()
export class UsersService {
    private users: User[] = [];

    getAllUsers(): User[] {
        return this.users;
    }

    getUsersWithFilter(filterDto: GetUsersFilterDto): User[] {
        const { status, search } = filterDto;

        let users = this.getAllUsers();

        if (status) {
            users = users.filter(user => user.status === status);
        }

        if (search) {
            users = users.filter(user => user.name.includes(search) || user.email.includes(search));
        }

        return users;
    }

    getUserById(id: string): User {
        return this.users.find(user => user.id == id);
    }

    createUser(createUserDto: CreateUserDto): User {
        const { name, email, password } = createUserDto;

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

    deleteUser(id: string): void {
        this.users = this.users.filter(user => user.id !== id);
    }

    updateUserStatus(id: string, status: UserStatus): User {
        const user = this.getUserById(id);
        user.status = status;
        return user;
    }
}
