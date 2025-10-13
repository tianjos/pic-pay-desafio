import { Body, Controller, Post } from '@nestjs/common';
import { Roles } from 'src/common/decorators/roles.decorator';
import { TransferDto } from '../dtos/transfer.dto';
import { PaymentsService } from '../services/payments.service';

@Controller('payments')
export class PaymentsController {
    constructor(private paymentsService: PaymentsService) { }

    @Post()
    @Roles(['pf'])
    async create(@Body() transferDto: TransferDto) {
        return this.paymentsService.transfer(transferDto)
    }

}
