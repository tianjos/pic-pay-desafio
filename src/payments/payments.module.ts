import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { PaymentsController } from './controllers/payments.controller';
import { AuthorizerService } from './services/authorizer.service';
import { NotificationsService } from './services/notifications.service';
import { PaymentsService } from './services/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    AuthorizerService,
    NotificationsService,
  ],
  imports: [
    HttpModule.register({ validateStatus: null }),
    BullModule.registerQueue({ name: 'notification' }),
    UsersModule
  ]
})
export class PaymentsModule { }
