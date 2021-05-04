import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, GetUsersFilterDto } from './user.dto';
import { UserStatusValidationPipe } from './pipes/user-pipes-validation.pipe';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto): Promise<any>  {
    return this.userService.createUser(createUserDto);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Patch('/:id/status')
  updateUserStatus(@Param('id', ParseIntPipe) id: number, @Body('status', UserStatusValidationPipe) status: UserStatus): Promise<User> {
    return this.userService.updateUserStatus(id, status);
  }

  @Delete('/:id')
  deleteUser(@Param('id',  ParseIntPipe) id: number): Promise<User> {
    return this.userService.updateUserStatus(id, UserStatus.DELETED);
  }

  @Get()
  getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto): Promise<User[]> {        
    return this.userService.getUsers(filterDto);
  }
}
