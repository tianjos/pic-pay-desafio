import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { CreatePaymentDto } from '../dtos/create-payment.dto';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    @Post()
    @Roles(['pf'])
    async create(@Body() dto: CreatePaymentDto) {
        return this.paymentsService.transfer(dto)
    }

}
