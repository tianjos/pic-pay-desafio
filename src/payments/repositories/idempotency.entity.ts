import { Timestamp } from "src/common/repositories/timestamp";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('idempotency_keys')
export class IdempotencyKey extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column({ unique: true })
    key: string

    @Column({ type: 'jsonb', nullable: true })
    response: any

    @Column({ nullable: true })
    expiresAt: Date
}