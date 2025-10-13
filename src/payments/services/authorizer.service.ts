import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom, retry } from 'rxjs';

@Injectable()
export class AuthorizerService {
    private readonly logger = new Logger(AuthorizerService.name)

    constructor(private readonly httpService: HttpService) { }

    async check() {
        const response = await firstValueFrom(this.httpService
            .get('https://util.devi.tools/api/v2/authorize')
            .pipe(
                retry(5),
                catchError((error: AxiosError) => {
                    this.logger.error(error.response?.data);

                    throw 'An error happened';
                }),
            )
        )

        if (response.status === 403) {
            throw 'unauthorizer'
        }
    }
}
