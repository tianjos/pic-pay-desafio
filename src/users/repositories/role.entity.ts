import { Timestamp } from "src/common/repositories/timestamp.entity";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('roles')
export class Role extends Timestamp {
    @PrimaryGeneratedColumn('identity')
    id: number

    @Column()
    name: string
}