import { typeOrmConfig } from './src/config/typeorm.config';

export = {
  ...typeOrmConfig,
  migrations: ['src/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: '/src/migrations'
  },
};
