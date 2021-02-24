import { Injectable, NotFoundException } from '@nestjs/common';
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
            users = users.filter(t => t.status === status);
        }

        if (search) {
            users = users.filter(t => t.name.includes(search) || t.email.includes(search));
        }

        return users;
    }

    getUserById(id: string): User {
        const user =  this.users.find(t => t.id == id);

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
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
        const user = this.getUserById(id);
        this.users = this.users.filter(t => t.id !== user.id);
    }

    updateUserStatus(id: string, status: UserStatus): User {
        const user = this.getUserById(id);
        user.status = status;
        return user;
    }
}
