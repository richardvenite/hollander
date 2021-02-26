import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto, GetUsersFilterDto } from "./user.dto";
import { UserStatus } from "./user-status.enum";
import { User } from "./user.entity";
import { v4 as uuid } from 'uuid';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    const user = new User();

    user.name = name;
    user.email = email;
    user.password = password;
    user.status = UserStatus.ACTIVED;
    user.hash = uuid();
    await user.save();

    return user;
  }

  async getUsers(filterDto: GetUsersFilterDto): Promise<User[]> {
    const { name, email, status } = filterDto;
    const query = this.createQueryBuilder('user');

    if (name) {
      query.andWhere('user.name LIKE :name', { name: `%${name}%` })
    }

    if (email) {
      query.andWhere('user.email LIKE :email', { email: `%${email}%` })
    }

    if (status) {
      query.andWhere('user.status = :status', { status: status })
    }
    
    const users = query.getMany();
    return users;
  }
}