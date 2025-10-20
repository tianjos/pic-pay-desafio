import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IdempotencyInterceptor } from '../interceptors/idempotency.interceptor';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    @Post()
    @UseInterceptors(IdempotencyInterceptor)
    async create(@Body() dto: CreatePaymentDto) {
        return this.paymentsService.transfer(dto)
    }

}
