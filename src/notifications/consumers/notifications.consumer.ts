import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Injectable } from "@nestjs/common";
import { Job } from "bullmq";
import { CreatePaymentDto } from "src/payments/dtos/create-payment.dto";
import { NotificationsService } from "../services/notifications.service";

@Processor('notification')
@Injectable()
export class NotificationsConsumer extends WorkerHost {
    constructor(private readonly notificationsService: NotificationsService) {
        super()
    }

    async process(job: Job<CreatePaymentDto>, token?: string): Promise<any> {
        await this.notificationsService.notifyPayment()
    }

}