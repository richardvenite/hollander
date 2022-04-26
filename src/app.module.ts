import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UserProfileModule } from './user-profile/user-profile.module';
import { ProfileModule } from './profile/profile.module';
import { IntegrationModule } from './integration/integration.module';
import { ConfigModule } from '@nestjs/config';
import { configValidationSchema } from './config/config.schema';
import { LessonService } from './lesson/lesson.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env`],
      validationSchema: configValidationSchema,
    }),
    UserModule,
    UserProfileModule,
    ProfileModule,
    IntegrationModule,
    TypeOrmModule.forRootAsync(typeOrmConfig),
    AuthModule,
  ],
  providers: [LessonService],
})
export class AppModule {}
