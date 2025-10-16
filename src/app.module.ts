import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account/account.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common/common.module';
import { BullConfigService } from './config/bull.config.service';
import { PostgresConfigService } from './config/postgres.config.service';
import { NotificationsModule } from './notifications/notifications.module';
import { PaymentsModule } from './payments/payments.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    UsersModule,
    PaymentsModule,
    NotificationsModule,
    CommonModule,
    AccountModule,
    ConfigModule.forRoot({ isGlobal: true, validationSchema: true }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    BullModule.forRootAsync({
      useClass: BullConfigService,
      inject: [BullConfigService]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
