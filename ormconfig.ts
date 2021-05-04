import { typeOrmConfig } from './src/config/typeorm.config';

export = {
  ...typeOrmConfig,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  entities: ['src/**/*.entity.{ts}'],
  cli: {
    migrationsDir: '/src/migrations'
  },
};
