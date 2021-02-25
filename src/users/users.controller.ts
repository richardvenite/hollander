import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, GetUsersFilterDto } from './user.dto';
import { UserStatusValidationPipe } from './pipes/user-pipes-validation.pipe';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Post()
    @UsePipes(ValidationPipe)
    createUser(@Body() createUserDto: CreateUserDto): Promise<any>  {
        return this.usersService.createUser(createUserDto);
    }

    @Get('/:id')
    getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.getUserById(id);
    }

    @Patch('/:id/status')
    updateUserStatus(@Param('id', ParseIntPipe) id: number, @Body('status', UserStatusValidationPipe) status: UserStatus): Promise<User> {
        return this.usersService.updateUserStatus(id, status);
    }

    @Delete('/:id')
    deleteUser(@Param('id',  ParseIntPipe) id: number): Promise<User> {
        return this.usersService.updateUserStatus(id, UserStatus.DELETED);
    }

    @Get()
    getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto): Promise<User[]> {        
        return this.usersService.getUsers(filterDto);
    }
}
