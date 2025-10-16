import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Queue } from 'bullmq';
import { MakeTransferDto } from 'src/account/dtos/make-transfer.dto';
import { AccountsService } from 'src/account/services/accounts.service';
import { UsersService } from 'src/users/user.service';
import { Repository } from 'typeorm';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { Payment } from '../repositories/payment.entity';
import { AuthorizerService } from './authorizer.service';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment)
        private readonly paymentsRepository: Repository<Payment>,
        @InjectQueue('notification')
        private readonly paymentsQueue: Queue,
        private readonly authorizerService: AuthorizerService,
        private readonly usersService: UsersService,
        private readonly accountsService: AccountsService
    ) { }

    async transfer(dto: CreatePaymentDto) {
        const [payer, payee] = await Promise.all([
            this.usersService.getById(dto.payer),
            this.usersService.getById(dto.value)
        ])

        await this.authorizerService.check()

        await this.accountsService.transfer(new MakeTransferDto(
            payer?.account!, payee?.account!, dto.value)
        )

        await this.paymentsQueue.add('payment', dto)

        await this.paymentsRepository.save(dto)

    }
}
