import { HttpService } from "@nestjs/axios";
import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common";
import { AxiosError } from "axios";
import { catchError, firstValueFrom, retry, tap } from "rxjs";

@Injectable()
export class NotificationsService {
    private readonly logger = new Logger(NotificationsService.name)

    constructor(private readonly httpService: HttpService) { }

    async notifyPayment() {
        const response = await firstValueFrom(this.httpService
            .post('https://util.devi.tools/api/v1/notify')
            .pipe(
                retry(5),
                tap(() => this.logger.log('notifying transfer')),
                catchError((error: AxiosError) => {
                    this.logger.error(error.response?.data);

                    throw new ServiceUnavailableException('try again later')
                }),
            )
        )

        if (response.status !== 204) {
            throw new ServiceUnavailableException('try again later')
        }

        this.logger.log('notification sended successfully')
    }

}