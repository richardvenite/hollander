import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto, GetUsersFilterDto } from './user.dto';
import { UserStatusValidationPipe } from './pipes/user-pipes-validation.pipe';
import { UserStatus } from './user-status.enum';
import { User } from './user.entity';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { GetAdmin } from 'src/auth/get-admin.decorator';
import { Admin } from 'src/auth/admin.entity';

@Controller('user')
@UseGuards(AuthGuard())
export class UserController {
  private logger = new Logger('UserController');

  constructor(private userService: UserService) {}

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDto: CreateUserDto, @GetAdmin() admin: Admin): Promise<any>  {
    return this.userService.createUser(createUserDto, admin);
  }

  @Get('/:id')
  getUserById(@Param('id', ParseIntPipe,) id: number, @GetAdmin() admin: Admin): Promise<User> {
    return this.userService.getUserById(id, admin);
  }

  @Patch('/:id/status')
  updateUserStatus(@Param('id', ParseIntPipe) id: number, @Body('status', UserStatusValidationPipe) status: UserStatus, @GetAdmin() admin: Admin): Promise<User> {
    return this.userService.updateUserStatus(id, status, admin);
  }

  @Delete('/:id')
  deleteUser(@Param('id',  ParseIntPipe) id: number, @GetAdmin() admin: Admin): Promise<User> {
    return this.userService.updateUserStatus(id, UserStatus.DELETED, admin);
  }

  @Get()
  getUsers(@Query(ValidationPipe) filterDto: GetUsersFilterDto, @GetAdmin() admin: Admin): Promise<User[]> {        
    return this.userService.getUsers(filterDto, admin);
  }
}
