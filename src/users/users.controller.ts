import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUsersFilterDto } from './dto/get-users-filter.dto';
import { UserStatusValidationPipe } from './pipes/user-pipes-validation.pipe';
import { User, UserStatus } from './user.model';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto): User[] {
        if (Object.keys(filterDto).length) {
            return this.usersService.getUsersWithFilter(filterDto);
        }
        
        return this.usersService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): User {
        return this.usersService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): User  {
        return this.usersService.createUser(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id') id: string): void {
        this.usersService.deleteUser(id);
    }

    @Patch('/:id/status')
    updateUserStatus(@Param('id') id: string, @Body('status', UserStatusValidationPipe) status: UserStatus): User {
        return this.usersService.updateUserStatus(id, status);
    }
}
