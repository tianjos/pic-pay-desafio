import { Body, Controller, Put, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { IdempotencyInterceptor } from '../interceptors/idempotency.interceptor';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    @Put()
    @UseInterceptors(IdempotencyInterceptor)
    async create(@Body() dto: CreatePaymentDto, @Res({ passthrough: true }) res: Response) {
        await this.paymentsService.transfer(dto)


        res.setHeader('Location', '/payments/1')
        // res.headers.set('Location', '/payments/1')
    }

}
