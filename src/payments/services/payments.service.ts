import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TransferDto } from '../dtos/transfer.dto';
import { Payment } from '../repositories/payment.entity';
import { AuthorizerService } from './authorizer.service';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectRepository(Payment) private paymentsRepository: Repository<Payment>,
        private readonly authorizerService: AuthorizerService
    ) { }

    async transfer(dto: TransferDto) {
        try {
            await this.authorizerService.check()

            await this.paymentsRepository.save(dto)
        } catch (error) {
            // 
        }
    }
}
