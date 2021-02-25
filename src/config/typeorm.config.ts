import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: '10.11.0.2',
    port: 5432,
    username: 'webadm',
    password: 'A123456',
    database: 'hollander',
    autoLoadEntities: true,
    synchronize: true,
};