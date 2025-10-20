import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { createHash } from "node:crypto";
import { Repository } from "typeorm";
import { IdempotencyKey } from "../repositories/idempotency.entity";

@Injectable()
export class IdempotencyService {
    constructor(
        @InjectRepository(IdempotencyKey)
        private readonly idempotencyKeysRepository: Repository<IdempotencyKey>,
    ) { }

    async findByKey(key: string) {
        return this.idempotencyKeysRepository.findOne({ where: { key } })
    }

    async save(key: string, response: any) {
        const entity = this.idempotencyKeysRepository.create({ key, response })
        return this.idempotencyKeysRepository.save(entity);
    }

    generateKeyFromRequest(body: any, userId: string) {
        const payload = JSON.stringify({ body, userId })

        return createHash('sha256').update(payload).digest('hex')
    }
}