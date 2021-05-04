import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ProfileModule } from './profile/profile.module';
import { IntegrationModule } from './integration/integration.module';

@Module({
  imports: [
    UserModule,
    UserProfileModule,
    ProfileModule,
    IntegrationModule,
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
  ],
})
export class AppModule {}
