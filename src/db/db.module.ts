import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "node:path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Module({
    imports: [TypeOrmModule.forRootAsync({
        useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            username: configService.get<string>('DB_USER'),
            password: configService.get<string>('DB_PASSWORD'),
            port: Number(configService.get<number>('DB_PORT')),
            database: configService.get<string>('DB_NAME'),
            entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
            migrations: [__dirname + '/migrations/*.{ts,js}'],
            namingStrategy: new SnakeNamingStrategy(),
            // logging: true,
            // logger: 'formatted-console'
        }),
        inject: [ConfigService]
    })]
})
export class DbModule { }