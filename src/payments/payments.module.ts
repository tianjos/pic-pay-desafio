import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { NotificationsConsumer } from './consumers/notifications.consumer';
import { PaymentsController } from './controllers/payments.controller';
import { IdempotencyInterceptor } from './interceptors/idempotency.interceptor';
import { IdempotencyKey } from './repositories/idempotency.entity';
import { Payment } from './repositories/payment.entity';
import { AuthorizerService } from './services/authorizer.service';
import { IdempotencyService } from './services/idempotency.service';
import { NotificationsService } from './services/notifications.service';
import { PaymentsService } from './services/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    AuthorizerService,
    NotificationsService,
    IdempotencyInterceptor,
    IdempotencyService,
    NotificationsConsumer,
  ],
  imports: [
    TypeOrmModule.forFeature([Payment, IdempotencyKey]),
    HttpModule.register({ validateStatus: null }),
    BullModule.registerQueue({ name: 'notification' }),
    UsersModule
  ]
})
export class PaymentsModule { }
