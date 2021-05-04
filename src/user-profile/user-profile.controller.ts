import { Controller, UseGuards } from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard())
export class UserProfileController {
  constructor(private usersService: UserProfileService) {}
}
