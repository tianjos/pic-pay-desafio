import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AccountsService } from 'src/account/services/accounts.service';
import { UsersService } from 'src/users/user.service';
import { PaymentsController } from './controllers/payments.controller';
import { PaymentsService } from './services/payments.service';

@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
    UsersService,
    AccountsService,
    HttpModule.register({ validateStatus: null }),
    BullModule.registerQueue({ name: 'notification' })
  ]
})
export class PaymentsModule { }
