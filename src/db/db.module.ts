import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            port: Number(configService.get<number>('DB_PORT')),
            database: configService.get<string>('DB_NAME'),
            entities: [__dirname + '/entities/**'],
            migrations: [__dirname + '/migrations/*.ts'],
            synchronize: false,
        }),
        inject: [ConfigService]
    })]
})
export class DbModule { }