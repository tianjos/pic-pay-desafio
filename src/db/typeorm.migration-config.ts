import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { join } from 'node:path';
import { DataSource, DataSourceOptions } from 'typeorm';

config();

const configService = new ConfigService();

const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: configService.get<string>('DB_HOST'),
    username: configService.get<string>('DB_USER'),
    password: configService.get<string>('DB_PASSWORD'),
    port: Number(configService.get<number>('DB_PORT')),
    database: configService.get<string>('DB_NAME'),
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [__dirname + '/migrations/*.{ts,js}'],
};

export default new DataSource(dataSourceOptions);