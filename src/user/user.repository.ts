import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { CreateUserDto, GetUsersFilterDto } from "./user.dto";
import { UserStatus } from "./user-status.enum";
import { User } from "./user.entity";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { PasswordTrait } from "src/trait/password.trait";
import { Admin } from "src/auth/admin.entity";
import { ProfileRepository } from "src/profile/profile.repository";
import { UserProfileRepository } from "src/user-profile/user-profile.repository";
import { Profile } from "src/profile/profile.entity";
import { Integration } from "src/integration/integration.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  trait: PasswordTrait;

  constructor() {
    super();
    this.trait = new PasswordTrait();
  }

  async createUser(createUserDto: CreateUserDto, admin: Admin): Promise<User> {
    const { name, email, password, profileId } = createUserDto;
    const user = new User();

    let profile = await this.existProfile(profileId);

    try {      
      let result = await this.trait.hash(password);

      user.name = name;
      user.email = email;
      user.password = result.password;
      user.status = UserStatus.ACTIVED;
      user.hash = result.hash;
      await this.save(user);
      
      this.createUserProfile(user, admin.integration, profile);
    } catch (ex) {
      if (ex.code == 23505) {
        throw new ConflictException('Email already exists');
      }

      throw new InternalServerErrorException(ex.message);
    }
    
    return user;
  }

  async existProfile(id: number): Promise<Profile> {
    try {
      let profileRepository = getCustomRepository(ProfileRepository);
      let profile = await profileRepository.findOne(id);
  
      if (!profile) {
        throw new NotFoundException(`Profile with ID ${id} not found`);
      }

      return profile;
    } catch (ex) {
      throw ex;
    }
  }

  async createUserProfile(user: User, integration: Integration, profile: Profile): Promise<void> {
    let userProfileRepository = getCustomRepository(UserProfileRepository);
    userProfileRepository.createUserProfile(user, integration, profile);
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