import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AccountSeeder } from './seeders/account.seeder';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    port: Number(configService.get<number>('DB_PORT')),
    database: configService.get<string>('DB_NAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
    namingStrategy: new SnakeNamingStrategy(),
    seeds: [AccountSeeder]
};

export default new DataSource(dataSourceOptions);