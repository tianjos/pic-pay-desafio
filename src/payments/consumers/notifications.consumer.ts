import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Logger } from "@nestjs/common";
import { Job } from "bullmq";
import { CreatePaymentDto } from "src/payments/dtos/create-payment.dto";
import { NotificationsService } from "../services/notifications.service";

@Processor('notification')
// @Injectable()
export class NotificationsConsumer extends WorkerHost {
    private readonly logger = new Logger(NotificationsService.name)

    constructor(private readonly notificationsService: NotificationsService) {
        super()
    }

    async process(job: Job<CreatePaymentDto>, token?: string): Promise<any> {
        this.logger.log('processing job')

        await this.notificationsService.notifyPayment()
    }

}