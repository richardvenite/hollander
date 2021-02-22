import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getAllUsers(): User[] {
        return this.usersService.getAllUsers();
    }

    @Post()
    createUser(
        @Body('name') name: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ): User  {
        return this.usersService.createUser(name, email, password);
    }
}
