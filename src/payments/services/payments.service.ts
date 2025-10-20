import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { MakeTransferDto } from 'src/payments/dtos/make-transfer.dto';
import { AccountsService } from 'src/users/services/accounts.service';
import { UsersService } from 'src/users/services/user.service';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { AuthorizerService } from './authorizer.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from '../repositories/payment.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentRepository: Repository<Payment>,
        @InjectQueue('notification')
        private readonly paymentsQueue: Queue,
        private readonly authorizerService: AuthorizerService,
        private readonly usersService: UsersService,
        private readonly accountsService: AccountsService,
        private readonly dataSource: DataSource,
    ) { }

    async transfer(dto: CreatePaymentDto) {
        const [payer, payee] = await Promise.all([
            this.usersService.getById(dto.payer),
            this.usersService.getById(dto.payee)
        ])

        await this.authorizerService.check()

        this.dataSource.transaction(async (trx) => {
            trx.
        })
        await Promise.all([

        ])

        await this.accountsService.transfer(new MakeTransferDto(
            payer?.account!, payee?.account!, dto.value)
        )

        await this.paymentsQueue.add('payment', dto)
    }
}
