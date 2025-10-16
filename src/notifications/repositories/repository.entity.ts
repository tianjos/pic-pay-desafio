import { Timestamp } from "src/common/repositories/timestamp.entity";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('notifications')
export class Notification extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number
}