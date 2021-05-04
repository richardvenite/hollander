import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthCredentialsDto, AuthCreateDto } from './admin.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signin')
  signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/create')
  @UseGuards(AuthGuard())
  create(@Body(ValidationPipe) authCreateDto: AuthCreateDto): Promise<any> {
    return this.authService.createAdmin(authCreateDto);
  }
}
