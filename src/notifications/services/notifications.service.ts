import { HttpService } from "@nestjs/axios";
import { Injectable, Logger } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom, retry } from "rxjs";

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name)

    constructor(private readonly httpService: HttpService) { }

    async notifyPayment() {
        const response = await firstValueFrom(this.httpService
            .post('https://util.devi.tools/api/v1/notify')
            .pipe(
                retry(5),
                catchError((error: AxiosError) => {
                    this.logger.error(error.response?.data);

                    throw new Error('could not send payment notification')
                }),
            )
        )

        if (response.status !== 204) {
            throw new Error('notification service unavailable')
        }
    }

}