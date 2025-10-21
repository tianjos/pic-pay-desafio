import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { of, tap } from "rxjs";
import { IdempotencyService } from "../services/idempotency.service";

interface CachedResponse {
    statusCode: number
    body: any
    location: string
}

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
    private cache = new Map<string, CachedResponse>()

    constructor(private readonly idempotencyService: IdempotencyService) { }

    async intercept(context: ExecutionContext, next: CallHandler<any>) {
        const request = context.switchToHttp().getRequest<Request>();
        const response = context.switchToHttp().getResponse<Response>()
        const key = (request.headers['idempotency-key'] as string) ||
            this.idempotencyService.generateKeyFromRequest(request.body)

        if (this.cache.has(key)) {
            const cachedResponse = this.cache.get(key)!
            response.status(cachedResponse.statusCode)
            response.setHeader('Location', cachedResponse.location)
            return of(cachedResponse.body)
        }

        return next.handle().pipe(
            tap((body) => {
                this.cache.set(key, {
                    statusCode: response.statusCode ?? 200,
                    body,
                    location: response.getHeader('Location') as string
                })
            })
        )
    }
}