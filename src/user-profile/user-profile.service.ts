import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './user-profile.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfileRepository)
    private userRepository: UserProfileRepository,
  ) {}
}
