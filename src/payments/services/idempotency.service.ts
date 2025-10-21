import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createHash } from "node:crypto";
import { LessThan, Repository } from "typeorm";
import { IdempotencyKey } from "../repositories/idempotency.entity";

@Injectable()
export class IdempotencyService {
    constructor(
        @InjectRepository(IdempotencyKey)
        private readonly idempotencyKeysRepository: Repository<IdempotencyKey>,
    ) { }

    async findByKey(key: string) {
        return this.idempotencyKeysRepository.findOne({ where: { key, expiresAt: LessThan(new Date()) } })
    }

    async save(key: string, response: any) {
        const entity = this.idempotencyKeysRepository.create({
            key,
            response,
            expiresAt: new Date(Date.now() + 1000 * 10) // expires in 10 seconds
        })
        return this.idempotencyKeysRepository.save(entity);
    }

    generateKeyFromRequest(body: any) {
        const payload = JSON.stringify(body)

        return createHash('sha256').update(payload).digest('hex')
    }
}