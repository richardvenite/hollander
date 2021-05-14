import { Injectable, NotFoundException } from '@nestjs/common';
import { UserStatus } from './user-status.enum';
import { CreateUserDto, GetUsersFilterDto } from './user.dto';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Admin } from 'src/auth/admin.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async createUser(createUserDto: CreateUserDto, admin: Admin): Promise<any> {
    const user = await this.userRepository.createUser(createUserDto, admin);

    return user;
  }

  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne(id);
    
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async updateUserStatus(id: number, status: UserStatus): Promise<User> {
    const user = await this.getUserById(id);
    user.status = status;
    user.save();

    return user
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    return this.userRepository.getUsers(filterDto);
  }
}
