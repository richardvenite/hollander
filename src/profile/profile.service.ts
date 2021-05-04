import { Injectable } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private profileRepository: ProfileRepository,
  ) {}
}
