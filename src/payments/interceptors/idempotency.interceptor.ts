import { CallHandler, ConflictException, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { from, map, of, switchMap } from "rxjs";
import { IdempotencyService } from "../services/idempotency.service";

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
    constructor(private readonly idempotencyService: IdempotencyService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const key = request.headers['idempotency-key']

        if (!key) {
            throw new ConflictException('Idempotency-key header is required')
        }

        const existing = await this.idempotencyService.findByKey(key)

        if (existing) {
            return of(existing.response)
        }

        return next.handle().pipe(
            map(async (response) => this.idempotencyService.save(key, response)),
            switchMap((promise) => from(promise))
        )
    }
}